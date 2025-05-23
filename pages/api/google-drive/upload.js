// pages/api/google-drive/upload.js - formidable 수정 버전

import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// formidable을 Promise로 wrapping하여 사용
export const config = {
  api: {
    bodyParser: false, // Formidable로 파일을 파싱하기 위해 Next.js의 bodyParser를 비활성화
  },
};

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

// 파일 폼 파싱 함수
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    try {
      // formidable 옵션 설정 개선
      // 주의: formidable 최신 버전은 다른 방식으로 생성자를 호출해야 함
      const form = formidable({
        keepExtensions: true,
        allowEmptyFiles: false,
        minFileSize: 1, // 최소 파일 크기
        maxFileSize: 10 * 1024 * 1024, // 10MB
        maxFieldsSize: 10 * 1024 * 1024, // 10MB
        maxFields: 20, // 최대 필드 수
        multiples: true, // 다중 파일 허용
        hashAlgorithm: false, // 해시 비활성화로 속도 향상
      });

      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Formidable 파싱 오류:', err);
          return reject(err);
        }

        console.log('Formidable 파싱 완료');
        console.log('파싱된 필드:', Object.keys(fields));
        console.log('파싱된 파일:', Object.keys(files));

        resolve({ fields, files });
      });
    } catch (error) {
      console.error('파싱 시도 중 오류:', error);
      reject(error);
    }
  });
};

export default async function handler(req, res) {
  // POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않는 메소드' });
  }

  try {
    console.log('파일 업로드 요청 받음');
    
    // 폼 데이터 파싱
    const { fields, files } = await parseForm(req);
    
    // 메타데이터 확인
    if (!fields.metadata) {
      console.error('metadata 필드 누락');
      return res.status(400).json({ error: 'metadata 필드가 누락되었습니다.' });
    }
    
    let metadata;
    try {
      metadata = JSON.parse(fields.metadata);
      console.log('파싱된 메타데이터:', metadata);
    } catch (error) {
      console.error('메타데이터 파싱 오류:', error, '원본 데이터:', fields.metadata);
      return res.status(400).json({ error: '메타데이터 파싱 오류: ' + error.message });
    }
    
    // 파일 확인
    if (!files.file) {
      console.error('file 필드 누락');
      return res.status(400).json({ error: 'file 필드가 누락되었습니다.' });
    }
    
    // 파일 정보
    const file = files.file;
    console.log('파일 정보:', {
      name: file.originalFilename,
      size: file.size,
      path: file.filepath,
      type: file.mimetype
    });
    
    // Google Drive API 인증
    const auth = await authenticateGoogle();
    const drive = google.drive({ version: 'v3', auth });
    
    // 파일 이름, 타입 설정
    const fileName = metadata.name || file.originalFilename || 'untitled';
    const mimeType = metadata.mimeType || file.mimetype || 'application/octet-stream';
    
    console.log('Google Drive에 업로드 중:', fileName);
    
    // Google Drive에 파일 업로드
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: mimeType,
        parents: metadata.parents || [process.env.GOOGLE_DRIVE_FOLDER_ID],
        description: metadata.description || '',
      },
      media: {
        mimeType: mimeType,
        body: fs.createReadStream(file.filepath),
      },
      fields: 'id,name,webViewLink',
    });
    
    console.log('업로드 성공:', response.data.id);
    
    // 파일 ID 반환
    return res.status(200).json({
      success: true,
      fileId: response.data.id,
      fileName: response.data.name,
      webViewLink: response.data.webViewLink,
      message: '파일이 성공적으로 Google Drive에 저장되었습니다.'
    });
  } catch (error) {
    console.error('Google Drive 업로드 오류:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}