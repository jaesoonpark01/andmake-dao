// pages/api/google-drive/list.js

import { google } from 'googleapis';

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

export default async function handler(req, res) {
  // GET 요청만 처리
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '허용되지 않는 메소드' });
  }

  try {
    // 쿼리 매개변수 가져오기
    const { query = "name contains '정책제안_'", pageSize = 10, orderBy = 'modifiedTime desc' } = req.query;
    
    // Google Drive API 인증
    const auth = await authenticateGoogle();
    const drive = google.drive({ version: 'v3', auth });
    
    // 파일 목록 가져오기
    const response = await drive.files.list({
      q: query, // 검색 쿼리
      pageSize: parseInt(pageSize), // 페이지 크기
      fields: 'files(id, name, mimeType, size, modifiedTime, webViewLink, iconLink, thumbnailLink)', // 반환할 필드
      orderBy: orderBy, // 정렬 기준
    });
    
    // 파일 목록 반환
    return res.status(200).json({
      success: true,
      files: response.data.files,
      message: `${response.data.files.length}개의 파일을 찾았습니다.`,
    });
  } catch (error) {
    console.error('Google Drive 파일 목록 조회 오류:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}