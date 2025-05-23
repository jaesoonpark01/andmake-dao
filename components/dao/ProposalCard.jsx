import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Button from '../ui/Button';
import { FiClock, FiCheck, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProposalCard({ proposal }) {
  const { connected } = useWallet();
  const [voted, setVoted] = useState(false);
  
  const handleVote = async (voteFor) => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    if (voted) {
      toast.error('이미 투표하셨습니다.');
      return;
    }
    
    try {
      // 실제 구현에서는 블록체인 트랜잭션 추가
      toast.success(voteFor ? '찬성 투표가 완료되었습니다.' : '반대 투표가 완료되었습니다.');
      setVoted(true);
    } catch (error) {
      console.error('투표 오류:', error);
      toast.error('투표 중 오류가 발생했습니다.');
    }
  };
  
  // 마감일 계산
  const isExpired = new Date(proposal.deadline) < new Date();
  const deadlineFormatted = new Date(proposal.deadline).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // 투표 비율 계산
  const totalVotes = proposal.votesFor + proposal.votesAgainst;
  const forPercentage = totalVotes === 0 ? 0 : Math.round((proposal.votesFor / totalVotes) * 100);
  const againstPercentage = 100 - forPercentage;
  
  return (
    <div className="bg-white rounded-2xl shadow-card p-6 mb-6 hover:shadow-card-hover transition-all duration-300 hover-lift">
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
          <FiClock className="mr-1" />
          <span>마감: {deadlineFormatted}</span>
        </div>
      </div>
      
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-brand-green-700">찬성: {proposal.votesFor}표 ({forPercentage}%)</span>
          <span className="text-sm font-medium text-red-600">반대: {proposal.votesAgainst}표 ({againstPercentage}%)</span>
        </div>
        <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-brand-green-400 to-brand-green-600"
            style={{ width: `${forPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {new Date(proposal.deadline) > new Date() && proposal.status === '투표 진행중' ? (
      proposal.hasVoted ? (
        <div className="text-center py-2 px-4 bg-gray-50 text-gray-500 text-sm rounded-xl">
          이미 투표하셨습니다.
        </div>
      ) : (
        <div className="flex space-x-4">
          <Button
            variant="primary"
            className="flex-1 bg-brand-green-600 hover:bg-brand-green-700 shadow-soft hover:shadow-hover transform hover:-translate-y-1 transition-all duration-300 rounded-xl"
            disabled={!connected || isSubmitting}
            onClick={() => {
              if (connected) {
                handleVote(proposal.id, 'for');
              } else {
                toast.error('지갑을 연결해주세요.');
              }
            }}
          >
            {isSubmitting ? (
              <>
                <FiLoader className="mr-2 animate-spin" />
                처리 중...
              </>
            ) : (
              '찬성'
            )}
          </Button>
          <Button
            variant="outline"
            className="flex-1 rounded-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300"
            disabled={!connected || isSubmitting}
            onClick={() => {
              if (connected) {
                handleVote(proposal.id, 'against');
              } else {
                toast.error('지갑을 연결해주세요.');
              }
            }}
          >
            {isSubmitting ? (
              <>
                <FiLoader className="mr-2 animate-spin" />
                처리 중...
              </>
            ) : (
              '반대'
            )}
          </Button>
        </div>
      )
    ) : (
      <div className="text-center py-2 px-4 bg-gray-50 text-gray-500 text-sm rounded-xl">
        {new Date(proposal.deadline) < new Date() ? '투표가 마감되었습니다.' : '이미 투표하셨습니다.'}
      </div>
    )}
    </div>
  );
}