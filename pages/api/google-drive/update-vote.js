// pages/api/google-drive/update-vote.js
// Google Drive에 저장된 제안 파일의 투표를 업데이트하는 API (완성본)

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Google API 인증 설정
const authenticateGoogle = async () => {
  try {
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;
    
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

// Google Drive에서 파일 내용 다운로드
const downloadFileContent = async (drive, fileId) => {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      alt: 'media'
    });
    
    return response.data;
  } catch (error) {
    console.error('파일 다운로드 오류:', error);
    throw error;
  }
};

// Google Drive 파일 업데이트
const updateFileContent = async (drive, fileId, content) => {
  try {
    // 임시 파일 생성
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `${Date.now()}-update.json`);
    
    // 파일 내용 저장
    fs.writeFileSync(tempFilePath, content);
    
    // 파일 업데이트
    const response = await drive.files.update({
      fileId: fileId,
      media: {
        mimeType: 'application/json',
        body: fs.createReadStream(tempFilePath)
      }
    });
    
    // 임시 파일 삭제
    fs.unlinkSync(tempFilePath);
    
    return response.data;
  } catch (error) {
    console.error('파일 업데이트 오류:', error);
    throw error;
  }
};

// 파일 ID로 제안 찾기
const findProposalFileById = async (drive, proposalId) => {
  try {
    // 제안 파일 검색
    const response = await drive.files.list({
      q: `name contains '정책제안_' and mimeType = 'application/json'`,
      fields: 'files(id, name, modifiedTime)',
      orderBy: 'modifiedTime desc'
    });
    
    // 제안 ID와 매칭되는 파일 찾기
    for (const file of response.data.files) {
      try {
        const fileContent = await downloadFileContent(drive, file.id);
        const proposalData = JSON.parse(fileContent);
        
        // ID 매칭 확인 (여러 방식으로)
        if (proposalData.id === proposalId || 
            proposalData.id === proposalId.toString() ||
            file.id === proposalId) {
          return {
            fileId: file.id,
            fileName: file.name,
            proposalData
          };
        }
      } catch (parseError) {
        console.warn(`파일 파싱 오류 (${file.name}):`, parseError.message);
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('제안 파일 검색 오류:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  // POST 요청만 처리
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '허용되지 않는 메소드입니다. POST 요청만 가능합니다.' });
  }

  try {
    console.log('투표 업데이트 요청 받음:', req.body);
    
    // 요청 본문 검증
    const { proposalId, voteType, voter } = req.body;
    
    if (!proposalId) {
      return res.status(400).json({ error: '제안 ID가 필요합니다.' });
    }
    
    if (!voteType || !['for', 'against'].includes(voteType)) {
      return res.status(400).json({ error: '투표 타입은 "for" 또는 "against"여야 합니다.' });
    }
    
    if (!voter) {
      return res.status(400).json({ error: '투표자 정보가 필요합니다.' });
    }
    
    // Google Drive API 인증
    const auth = await authenticateGoogle();
    const drive = google.drive({ version: 'v3', auth });
    
    console.log('제안 파일 검색 중:', proposalId);
    
    // 제안 파일 찾기
    const proposalFile = await findProposalFileById(drive, proposalId);
    
    if (!proposalFile) {
      return res.status(404).json({ 
        error: '해당 제안을 찾을 수 없습니다.',
        proposalId
      });
    }
    
    console.log('제안 파일 찾음:', proposalFile.fileName);
    
    // 기존 제안 데이터 가져오기
    let proposalData = proposalFile.proposalData;
    
    // 투표자 중복 확인
    const existingVoters = proposalData.voters || [];
    const hasVoted = existingVoters.some(v => v.address === voter);
    
    if (hasVoted) {
      return res.status(400).json({ 
        error: '이미 투표하셨습니다.',
        voter
      });
    }
    
    // 마감일 확인
    const now = new Date();
    const deadline = new Date(proposalData.deadline);
    
    if (now > deadline) {
      return res.status(400).json({ 
        error: '투표 기간이 만료되었습니다.',
        deadline: proposalData.deadline
      });
    }
    
    // 투표 데이터 업데이트
    const updatedProposalData = {
      ...proposalData,
      votesFor: voteType === 'for' ? (proposalData.votesFor || 0) + 1 : (proposalData.votesFor || 0),
      votesAgainst: voteType === 'against' ? (proposalData.votesAgainst || 0) + 1 : (proposalData.votesAgainst || 0),
      voters: [
        ...existingVoters,
        {
          address: voter,
          vote: voteType,
          timestamp: new Date().toISOString()
        }
      ],
      lastUpdated: new Date().toISOString()
    };
    
    // 투표 비율 계산
    const totalVotes = updatedProposalData.votesFor + updatedProposalData.votesAgainst;
    updatedProposalData.votePercentage = totalVotes === 0 ? 0 : Math.round((updatedProposalData.votesFor / totalVotes) * 100);
    
    // 상태 업데이트 (마감일이 지났거나 충분한 투표가 모였을 때)
    if (now > deadline) {
      updatedProposalData.status = updatedProposalData.votePercentage >= 50 ? '승인됨' : '거부됨';
    } else if (totalVotes >= 100) { // 100표 이상 모이면 조기 결정
      updatedProposalData.status = updatedProposalData.votePercentage >= 50 ? '승인됨' : '거부됨';
    }
    
    console.log('투표 업데이트 데이터:', {
      votesFor: updatedProposalData.votesFor,
      votesAgainst: updatedProposalData.votesAgainst,
      votePercentage: updatedProposalData.votePercentage,
      status: updatedProposalData.status,
      totalVoters: updatedProposalData.voters.length
    });
    
    // 파일 업데이트
    const updatedContent = JSON.stringify(updatedProposalData, null, 2);
    await updateFileContent(drive, proposalFile.fileId, updatedContent);
    
    console.log('파일 업데이트 완료');
    
    // 성공 응답
    return res.status(200).json({
      success: true,
      message: `${voteType === 'for' ? '찬성' : '반대'} 투표가 성공적으로 처리되었습니다.`,
      data: {
        proposalId: proposalData.id,
        fileId: proposalFile.fileId,
        fileName: proposalFile.fileName,
        voteType,
        voter,
        currentVotes: {
          votesFor: updatedProposalData.votesFor,
          votesAgainst: updatedProposalData.votesAgainst,
          votePercentage: updatedProposalData.votePercentage,
          totalVoters: updatedProposalData.voters.length
        },
        status: updatedProposalData.status,
        webViewLink: `https://drive.google.com/file/d/${proposalFile.fileId}/view`
      }
    });
    
  } catch (error) {
    console.error('투표 업데이트 처리 오류:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      message: '투표 처리 중 서버 오류가 발생했습니다.'
    });
  }
}