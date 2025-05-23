// pages/api/google-drive/json-upload.js - 폴더 ID 문제 수정 버전

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Google API 인증 설정
const authenticateGoogle = async () => {
  try {
    // 개인 키 문자열 처리 개선
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
    // 개인 키가 JSON 이스케이프된 형태(\n 문자가 포함)인 경우 실제 줄바꿈으로 변환
    if (privateKey && privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    return auth;
  } catch (error) {
    console.error('Google 인증 오류:', error);
    throw error;
  }
};

// 폴더 접근 권한 확인 함수
const checkFolderAccess = async (drive, folderId) => {
  try {
    if (folderId === 'root') return true;
    
    // 폴더 정보 요청
    await drive.files.get({
      fileId: folderId,
      fields: 'id,name'
    });
    
    console.log(`폴더 접근 확인 성공: ${folderId}`);
    return true;
  } catch (error) {
    console.error(`폴더 접근 오류 (${folderId}):`, error.message);
    return false;
  }
};

export default async function handler(req, res) {
  // POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않는 메소드' });
  }

  let tempFilePath = null;

  try {
    // 요청 본문 확인
    if (!req.body) {
      return res.status(400).json({ error: '요청 본문이 누락되었습니다' });
    }
    
    const { metadata, content } = req.body;
    
    if (!metadata || !content) {
      return res.status(400).json({ error: '필수 필드가 누락되었습니다: metadata, content' });
    }
    
    // 임시 파일 생성
    const tempDir = os.tmpdir();
    tempFilePath = path.join(tempDir, `${Date.now()}-${metadata.name || 'file.json'}`);
    
    console.log('임시 파일 저장 경로:', tempFilePath);
    
    // 파일 내용 저장
    fs.writeFileSync(tempFilePath, content);
    
    // Google Drive API 인증
    const auth = await authenticateGoogle();
    const drive = google.drive({ version: 'v3', auth });
    
    // 폴더 ID 처리 및 검증
    let parentFolderId = 'root';
    
    // parents 속성이 배열인 경우
    if (Array.isArray(metadata.parents) && metadata.parents.length > 0) {
      parentFolderId = metadata.parents[0];
    } 
    // parents 속성이 문자열인 경우
    else if (typeof metadata.parents === 'string' && metadata.parents.trim() !== '') {
      parentFolderId = metadata.parents;
    }
    // process.env에서 가져오는 경우
    else if (process.env.GOOGLE_DRIVE_FOLDER_ID) {
      parentFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    }
    
    console.log('사용할 폴더 ID:', parentFolderId);
    
    // 폴더 접근 권한 확인
    const hasFolderAccess = await checkFolderAccess(drive, parentFolderId);
    
    // 폴더 접근 권한이 없으면 root 폴더 사용
    if (!hasFolderAccess) {
      console.warn(`폴더 ID ${parentFolderId}에 접근할 수 없어 root 폴더를 사용합니다.`);
      parentFolderId = 'root';
    }
    
    console.log('파일 업로드 시작:', metadata.name, '폴더:', parentFolderId);
    
    // Google Drive에 파일 업로드
    const response = await drive.files.create({
      requestBody: {
        name: metadata.name,
        mimeType: metadata.mimeType || 'application/json',
        parents: [parentFolderId], // 배열 형태로 폴더 ID 전달
        description: metadata.description || '',
      },
      media: {
        mimeType: metadata.mimeType || 'application/json',
        body: fs.createReadStream(tempFilePath),
      },
      fields: 'id,name,webViewLink',
    });
    
    console.log('파일 업로드 성공:', response.data.id, '폴더:', parentFolderId);
    
    // 파일 ID 반환
    return res.status(200).json({
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
      webViewLink: response.data.webViewLink,
      folderId: parentFolderId,
      message: '파일이 성공적으로 Google Drive에 저장되었습니다.'
    });
  } catch (error) {
    console.error('Google Drive 업로드 오류:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  } finally {
    // 임시 파일 삭제
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      try {
        fs.unlinkSync(tempFilePath);
        console.log('임시 파일 삭제 완료:', tempFilePath);
      } catch (error) {
        console.warn('임시 파일 삭제 오류:', error);
      }
    }
  }
}