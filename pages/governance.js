// pages/governance.js - 투표 기능 수정 버전
// 기존 governance.js 파일에서 투표 관련 함수들만 수정된 버전입니다.

import { useState, useEffect } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import ProposalCard from '../components/dao/ProposalCard';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useWallet } from '@solana/wallet-adapter-react';
import { FiPlusCircle, FiFilter, FiSave, FiLoader, FiCheckCircle, FiAlertTriangle, FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function GovernancePage() {
  const { connected, publicKey } = useWallet();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedProposals, setSavedProposals] = useState([]);
  const [loadingDriveData, setLoadingDriveData] = useState(false);
  const [votingStates, setVotingStates] = useState({}); // 투표 중인 상태 관리

  // 최근 제안 업로드 상태를 위한 상태 변수
  const [lastUploadStatus, setLastUploadStatus] = useState({
    success: null,
    fileId: null,
    fileName: null,
    uploadTime: null
  });

  // 예시 데이터 로드
  useEffect(() => {
    setTimeout(() => {
      setProposals([
        {
          id: 1,
          title: '탄소 중립을 위한 재생에너지 투자 정책',
          description: '커뮤니티 기금의 30%를 태양광 및 풍력 발전 프로젝트에 투자하여 탄소 중립 목표 달성을 가속화하는 정책을 제안합니다.',
          proposer: '0x1a2b...3c4d',
          deadline: '2025-06-15',
          status: '투표 진행중',
          votesFor: 45,
          votesAgainst: 12,
          votePercentage: 79,
          fileId: 'mock-file-id-1' // Google Drive 파일 ID 추가
        },
        {
          id: 2,
          title: '친환경 교육 프로그램 확대',
          description: '지역 학교와 협력하여 기후 변화 교육 프로그램을 확대하고, 참여 학생들에게 ANDMAKE 토큰을 보상으로 지급하는 정책입니다.',
          proposer: '0x5e6f...7g8h',
          deadline: '2025-06-20',
          status: '투표 진행중',
          votesFor: 28,
          votesAgainst: 8,
          votePercentage: 78,
          fileId: 'mock-file-id-2'
        },
        {
          id: 3,
          title: '플라스틱 제로 챌린지 도입',
          description: '한 달간 플라스틱 사용을 완전히 줄이는 챌린지를 도입하고, 성공자에게 특별 NFT와 토큰 보상을 지급하는 정책을 제안합니다.',
          proposer: '0x9i0j...1k2l',
          deadline: '2025-05-30',
          status: '승인됨',
          votesFor: 67,
          votesAgainst: 15,
          votePercentage: 82,
          fileId: 'mock-file-id-3'
        }
      ]);
      setLoading(false);
    }, 1000);

    // Google Drive에서 저장된 제안 목록 가져오기
    fetchSavedProposals();
  }, []);

  // Google Drive에 저장된 제안 목록 가져오기
  const fetchSavedProposals = async () => {
    try {
      setLoadingDriveData(true);
      const response = await fetch('/api/google-drive/list?query=name contains \'정책제안_\'');
      if (!response.ok) {
        throw new Error('Google Drive 파일 목록 가져오기 실패');
      }
      
      const data = await response.json();
      setSavedProposals(data.files || []);
    } catch (error) {
      console.error('저장된 제안 목록 가져오기 오류:', error);
      toast.error('저장된 제안 목록을 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoadingDriveData(false);
    }
  };

  // Google Drive에 제안 저장 함수
  const saveProposalToGoogleDrive = async (proposalData) => {
    try {
      const proposalJson = JSON.stringify(proposalData, null, 2);
      const now = new Date();
      const dateStr = now.toISOString().replace(/[:.]/g, '-');
      const shortTitle = proposalData.title.length > 30 
        ? proposalData.title.substring(0, 30) + '...' 
        : proposalData.title;
      const fileName = `정책제안_${shortTitle}_${dateStr}.json`;
      
      const folderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;
      
      const metadata = {
        name: fileName,
        mimeType: 'application/json',
        description: `그리고만들다 DAO - ${proposalData.title} - 제안자: ${proposalData.proposer}`,
        parents: folderId ? [folderId] : ['root']
      };
      
      const response = await fetch('/api/google-drive/json-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metadata: metadata,
          content: proposalJson
        }),
      });
      
      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || `상태 코드: ${response.status}`;
          
          if (errorMessage.includes('File not found') && metadata.parents[0] !== 'root') {
            console.warn('폴더 ID 오류, root 폴더로 재시도합니다.');
            
            metadata.parents = ['root'];
            
            const retryResponse = await fetch('/api/google-drive/json-upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                metadata: metadata,
                content: proposalJson
              }),
            });
            
            if (retryResponse.ok) {
              return await retryResponse.json();
            } else {
              const retryErrorData = await retryResponse.json().catch(() => ({ error: '응답 파싱 오류' }));
              throw new Error(`Drive API 재시도 실패: ${retryErrorData.error || retryResponse.statusText}`);
            }
          } else {
            throw new Error(`Drive API 호출 실패: ${errorMessage}`);
          }
        } catch (parseError) {
          throw new Error(`Drive API 호출 실패: ${response.statusText}`);
        }
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Google Drive 저장 오류:', error);
      throw error;
    }
  };

  // 제안 제출 함수
  const handleSubmitProposal = async () => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    if (!proposalTitle.trim() || !proposalDescription.trim()) {
      toast.error('제목과 설명을 모두 입력해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const toastId = toast.loading('정책 제안을 구글 드라이브에 저장 중입니다...');
      
      const proposalId = `proposal-${Date.now()}`;
      
      const proposalData = {
        id: proposalId,
        title: proposalTitle,
        description: proposalDescription,
        proposer: publicKey.toString(),
        proposerShort: `${publicKey.toString().substring(0, 4)}...${publicKey.toString().substring(publicKey.toString().length - 4)}`,
        submittedAt: new Date().toISOString(),
        status: '투표 진행중',
        votesFor: 0,
        votesAgainst: 0,
        votePercentage: 0,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        voters: [] // 투표자 목록 초기화
      };
      
      const result = await saveProposalToGoogleDrive(proposalData);
      
      setProposals(prevProposals => [
        {
          ...proposalData,
          id: prevProposals.length + 1,
          proposer: proposalData.proposerShort,
          deadline: new Date(proposalData.deadline).toISOString().split('T')[0],
          fileId: result.fileId // Google Drive 파일 ID 저장
        },
        ...prevProposals
      ]);
      
      toast.success('정책 제안이 성공적으로 제출되었습니다!', { id: toastId });
      
      setProposalTitle('');
      setProposalDescription('');
      setShowProposalForm(false);
      
    } catch (error) {
      console.error('제안 저장 오류:', error);
      toast.error(`제안 저장 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 투표 함수 - 새로운 API 연동
  const handleVote = async (proposalId, voteType) => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    // 이미 투표 중인지 확인
    if (votingStates[proposalId]) {
      toast.error('이미 투표 처리 중입니다.');
      return;
    }
    
    // 이미 투표했는지 확인
    if (hasUserVoted(proposalId)) {
      toast.error('이미 투표하셨습니다.');
      return;
    }
    
    // 투표 상태 설정
    setVotingStates(prev => ({ ...prev, [proposalId]: true }));
    
    try {
      const toastId = toast.loading(`${voteType === 'for' ? '찬성' : '반대'} 투표를 처리 중입니다...`);
      
      console.log('투표 API 호출:', {
        proposalId,
        voteType,
        voter: publicKey.toString()
      });
      
      const response = await fetch('/api/google-drive/update-vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          proposalId: proposalId,
          voteType: voteType,
          voter: publicKey.toString()
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '투표 처리 중 오류가 발생했습니다.');
      }
      
      const result = await response.json();
      console.log('투표 결과:', result);
      
      // 로컬 상태 업데이트
      setProposals(prevProposals => 
        prevProposals.map(p => {
          if (p.id === proposalId || p.id.toString() === proposalId.toString()) {
            return {
              ...p,
              votesFor: result.data.currentVotes.votesFor,
              votesAgainst: result.data.currentVotes.votesAgainst,
              votePercentage: result.data.currentVotes.votePercentage,
              status: result.data.status || p.status
            };
          }
          return p;
        })
      );
      
      toast.success(result.message || `${voteType === 'for' ? '찬성' : '반대'} 투표가 성공적으로 처리되었습니다!`, { id: toastId });
      
      // 사용자 투표 상태 저장
      saveUserVote(proposalId, voteType);
      
    } catch (error) {
      console.error('투표 오류:', error);
      toast.error(error.message);
    } finally {
      // 투표 상태 해제
      setVotingStates(prev => ({ ...prev, [proposalId]: false }));
    }
  };

  // 사용자 투표 상태 저장 헬퍼 함수
  const saveUserVote = (proposalId, voteType) => {
    try {
      const votesJson = localStorage.getItem('userVotes') || '{}';
      const votes = JSON.parse(votesJson);
      
      votes[proposalId] = {
        vote: voteType,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('userVotes', JSON.stringify(votes));
    } catch (error) {
      console.error('투표 상태 저장 오류:', error);
    }
  };

  // 사용자 투표 상태 확인 헬퍼 함수
  const hasUserVoted = (proposalId) => {
    try {
      const votesJson = localStorage.getItem('userVotes') || '{}';
      const votes = JSON.parse(votesJson);
      
      return !!votes[proposalId];
    } catch (error) {
      console.error('투표 상태 확인 오류:', error);
      return false;
    }
  };

  // 필터링된 제안 목록
  const filteredProposals = filter === 'all' 
    ? proposals 
    : proposals.filter(proposal => proposal.status === filter);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 animate-fadeIn">
      {/* 헤더 섹션 */}
      <div className="relative mb-12 pb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green-200 rounded-full opacity-20 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-blue-200 rounded-full opacity-20 blur-3xl -z-10"></div>
        
        <SectionHeading 
          title={<span><span className="text-brand-green-600">거버넌스</span> - 함께 만들어가는 DAO</span>} 
          subtitle="그리고만들다 DAO의 의사결정에 참여하고 기후위기 대응을 위한 정책을 함께 만들어 가세요."
        />
      </div>
      
      {/* 필터 및 제안 버튼 */}
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2 rounded-xl bg-gray-50/70 backdrop-blur-sm p-2 shadow-soft">
          <FiFilter className="text-gray-500 ml-2" />
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
            className="rounded-lg"
          >
            전체
          </Button>
          <Button 
            variant={filter === '투표 진행중' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('투표 진행중')}
            className="rounded-lg"
          >
            진행중
          </Button>
          <Button 
            variant={filter === '승인됨' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('승인됨')}
            className="rounded-lg"
          >
            승인됨
          </Button>
          <Button 
            variant={filter === '거부됨' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('거부됨')}
            className="rounded-lg"
          >
            거부됨
          </Button>
        </div>
        
        <Button 
          variant="primary" 
          className="flex items-center mt-4 sm:mt-0 bg-brand-green-600 hover:bg-brand-green-700 shadow-soft hover:shadow-hover transform hover:-translate-y-1 transition-all duration-300 rounded-xl"
          onClick={() => setShowProposalForm(!showProposalForm)}
        >
          <FiPlusCircle className="mr-2" />
          정책 제안하기
        </Button>
      </div>
      
      {/* 제안 폼 */}
      {showProposalForm && (
        <div className="mb-10 animate-scaleIn">
          <Card className="glass-card p-6 border border-brand-green-100">
            <h3 className="text-xl font-bold mb-6 text-brand-green-800 border-b border-brand-green-100 pb-3">새로운 정책 제안하기</h3>
            
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                제목
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green-600 focus:border-transparent transition-all"
                placeholder="제안 제목을 입력하세요"
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                설명
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green-600 focus:border-transparent transition-all"
                rows="6"
                placeholder="제안 내용을 자세히 작성해주세요..."
                value={proposalDescription}
                onChange={(e) => setProposalDescription(e.target.value)}
                disabled={isSubmitting}
              ></textarea>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() => setShowProposalForm(false)}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                variant="primary"
                className="rounded-xl shadow-soft hover:shadow-hover transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                onClick={handleSubmitProposal}
                disabled={isSubmitting || !connected || !proposalTitle.trim() || !proposalDescription.trim()}
              >
                {isSubmitting ? (
                  <>
                    <FiLoader className="mr-2 animate-spin" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    제안 제출하기
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {/* Google Drive에 저장된 제안 목록 */}
      {savedProposals.length > 0 && (
        <div className="mb-8">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Google Drive에 저장된 제안</h3>
            
            {loadingDriveData ? (
              <div className="text-center py-4">
                <FiLoader className="h-6 w-6 mx-auto animate-spin text-brand-green-600" />
                <p className="mt-2 text-gray-600">Google Drive 파일 로딩 중...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">파일명</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수정일</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {savedProposals.map((file) => (
                      <tr key={file.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-normal">
                          <div className="text-sm text-gray-900">{file.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(file.modifiedTime).toLocaleString('ko-KR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <a
                            href={`https://drive.google.com/file/d/${file.id}/view`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-green-600 hover:text-brand-green-900 mr-4"
                          >
                            보기
                          </a>
                          <a
                            href={`https://drive.google.com/uc?export=download&id=${file.id}`}
                            className="text-brand-blue-600 hover:text-brand-blue-900"
                          >
                            다운로드
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      )}
      
      {/* 제안 목록 */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block loader"></div>
          <p className="mt-4 text-gray-600">정책 제안 목록을 불러오는 중...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredProposals.length > 0 ? (
            filteredProposals.map((proposal, index) => (
              <div key={proposal.id} className="animate-slideUp" style={{animationDelay: `${index * 100}ms`}}>
                <div className="bg-white rounded-2xl shadow-card p-6 mb-6 hover:shadow-card-hover transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{proposal.title}</h3>
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      proposal.status === '투표 진행중' 
                        ? 'bg-brand-blue-100 text-brand-blue-600' 
                        : proposal.status === '승인됨' 
                          ? 'bg-brand-green-100 text-brand-green-700'
                          : 'bg-red-100 text-red-700'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{proposal.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                      <span className="font-medium">제안자:</span>
                      <span className="ml-1">{proposal.proposer}</span>
                    </div>
                    <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                      <span className="font-medium">마감:</span>
                      <span className="ml-1">{
                        new Date(proposal.deadline).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      }</span>
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-brand-green-700">찬성: {proposal.votesFor}표 ({proposal.votePercentage}%)</span>
                      <span className="text-sm font-medium text-red-600">반대: {proposal.votesAgainst}표 ({100 - proposal.votePercentage}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-brand-green-400 to-brand-green-600"
                        style={{ width: `${proposal.votePercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* 투표 버튼 */}
                  {new Date(proposal.deadline) > new Date() && proposal.status === '투표 진행중' && !hasUserVoted(proposal.id) ? (
                    <div className="flex space-x-4">
                      <Button
                        variant="primary"
                        className="flex-1 bg-brand-green-600 hover:bg-brand-green-700 shadow-soft hover:shadow-hover transform hover:-translate-y-1 transition-all duration-300 rounded-xl flex items-center justify-center"
                        disabled={!connected || votingStates[proposal.id]}
                        onClick={() => handleVote(proposal.id, 'for')}
                      >
                        {votingStates[proposal.id] ? (
                          <FiLoader className="mr-2 animate-spin" />
                        ) : (
                          <FiCheck className="mr-2" />
                        )}
                        찬성
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                        disabled={!connected || votingStates[proposal.id]}
                        onClick={() => handleVote(proposal.id, 'against')}
                      >
                        {votingStates[proposal.id] ? (
                          <FiLoader className="mr-2 animate-spin" />
                        ) : (
                          <FiX className="mr-2" />
                        )}
                        반대
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-2 px-4 bg-gray-50 text-gray-500 text-sm rounded-xl">
                      {new Date(proposal.deadline) < new Date() ? '투표가 마감되었습니다.' : 
                       hasUserVoted(proposal.id) ? '이미 투표하셨습니다.' : 
                       '투표할 수 없는 상태입니다.'}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50/70 rounded-2xl">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg">해당 조건의 제안이 없습니다.</p>
            </div>
          )}
        </div>
      )}
      
      {/* DAO 거버넌스 프로세스 설명 */}
      <div className="bg-white rounded-2xl shadow-card p-8 mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green-100 rounded-full opacity-20 blur-3xl -z-10"></div>
        
        <h3 className="text-xl font-bold mb-8 text-center relative">
          <span className="relative z-10 inline-block">
            DAO 거버넌스 프로세스
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-brand-green-400 rounded-full"></div>
          </span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="relative">
            <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-brand-green-100 hidden md:block"></div>
            <div className="relative z-10">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-brand-green-600 text-white flex items-center justify-center font-bold shadow-soft">1</div>
              </div>
              <h4 className="text-center font-bold mt-4 mb-2">정책 제안</h4>
              <p className="text-sm text-center text-gray-700">회원들이 기후위기 대응을 위한 정책 아이디어를 제안합니다.</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-brand-green-100 hidden md:block"></div>
            <div className="relative z-10">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-brand-green-600 text-white flex items-center justify-center font-bold shadow-soft">2</div>
              </div>
              <h4 className="text-center font-bold mt-4 mb-2">커뮤니티 투표</h4>
              <p className="text-sm text-center text-gray-700">회원들이 제안에 대해 찬반 투표를 진행합니다. 투표 기간은 7일입니다.</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-brand-green-100 hidden md:block"></div>
            <div className="relative z-10">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-brand-green-600 text-white flex items-center justify-center font-bold shadow-soft">3</div>
              </div>
              <h4 className="text-center font-bold mt-4 mb-2">승인 결정</h4>
              <p className="text-sm text-center text-gray-700">과반수(50% 이상)의 찬성을 받으면 제안이 승인됩니다.</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-brand-green-600 text-white flex items-center justify-center font-bold shadow-soft">4</div>
              </div>
              <h4 className="text-center font-bold mt-4 mb-2">정책 실행</h4>
              <p className="text-sm text-center text-gray-700">승인된 제안은 자동으로 실행되며, 제안자에게 보상이 지급됩니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}