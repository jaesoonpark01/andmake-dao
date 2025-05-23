// pages/api/google-drive/update.js

import { google } from 'googleapis';
import { IncomingForm } from 'formidable';
import fs from 'fs';

// formidable을 Promise로 wrapping하여 사용
export const config = {
  api: {
    bodyParser: false, // Formidable로 파일을 파싱하기 위해 Next.js의 bodyParser를 비활성화
  },
};

// Google API 인증 설정
const authenticateGoogle = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  return auth;
};

// 파일 폼 파싱 함수
const parseForm = (req) => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};

// Google Drive에서 파일 내용 가져오기
const getFileContent = async (auth, fileId) => {
  const drive = google.drive({ version: 'v3', auth });
  const response = await drive.files.get({
    fileId: fileId,
    alt: 'media', // 파일 내용을 가져오기 위한 설정
  });
  
  return response.data;
};

export default async function handler(req, res) {
  // PATCH 요청만 처리
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: '허용되지 않는 메소드' });
  }

  try {
    // 폼 데이터 파싱
    const { fields } = await parseForm(req);
    
    // 필수 매개변수 확인
    const { fileId, voteType, voter } = JSON.parse(fields.data);
    
    if (!fileId || !voteType || !voter) {
      return res.status(400).json({ error: '필수 매개변수 누락 (fileId, voteType, voter)' });
    }
    
    // Google Drive API 인증
    const auth = await authenticateGoogle();
    
    // 파일 내용 가져오기
    const fileContent = await getFileContent(auth, fileId);
    
    // JSON 형식이 아닌 경우 오류 반환
    if (typeof fileContent !== 'object') {
      return res.status(400).json({ error: '지원되지 않는 파일 형식' });
    }
    
    // 투표 업데이트
    const updatedContent = {
      ...fileContent,
      votesFor: voteType === 'for' ? (fileContent.votesFor || 0) + 1 : fileContent.votesFor || 0,
      votesAgainst: voteType === 'against' ? (fileContent.votesAgainst || 0) + 1 : fileContent.votesAgainst || 0,
      voters: [...(fileContent.voters || []), {
        address: voter,
        vote: voteType,
        timestamp: new Date().toISOString()
      }]
    };
    
    // 백분율 계산
    const totalVotes = updatedContent.votesFor + updatedContent.votesAgainst;
    updatedContent.votePercentage = totalVotes === 0 ? 0 : Math.round((updatedContent.votesFor / totalVotes) * 100);
    
    // 상태 업데이트 (마감일 지났는지 확인)
    const now = new Date();
    const deadline = new Date(updatedContent.deadline);
    
    if (now > deadline) {
      updatedContent.status = updatedContent.votePercentage >= 50 ? '승인됨' : '거부됨';
    }
    
    // 파일 업데이트
    const drive = google.drive({ version: 'v3', auth });
    await drive.files.update({
      fileId: fileId,
      media: {
        mimeType: 'application/json',
        body: JSON.stringify(updatedContent, null, 2)
      }
    });
    
    // 업데이트된 내용 반환
    return res.status(200).json({
      success: true,
      fileId: fileId,
      updatedContent: updatedContent,
      message: '투표가 성공적으로 업데이트되었습니다.'
    });
  } catch (error) {
    console.error('Google Drive 파일 업데이트 오류:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}