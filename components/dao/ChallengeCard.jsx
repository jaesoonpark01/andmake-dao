import { useState } from 'react';
import Link from 'next/link';
import { useWallet } from '@solana/wallet-adapter-react';
import Button from '../ui/Button';
import { FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ChallengeCard({ challenge }) {
  const { connected } = useWallet();
  const [isParticipating, setIsParticipating] = useState(false);
  
  const handleParticipate = async () => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    // 참여 로직 구현
    try {
      // 실제 구현 시 API 호출 또는 블록체인 트랜잭션 추가
      toast.success('챌린지에 성공적으로 참여했습니다!');
      setIsParticipating(true);
    } catch (error) {
      console.error('참여 중 오류 발생:', error);
      toast.error('참여 중 오류가 발생했습니다.');
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col card-hover">
      <div className="bg-dark-green text-white p-4">
        <h3 className="text-lg font-bold">{challenge.title}</h3>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-sm text-gray-700 mb-4">{challenge.description}</p>
        
        <ul className="text-sm text-left space-y-2 mb-4">
          {challenge.tasks.map((task, index) => (
            <li key={index} className="flex items-center">
              <FiCheckCircle className="h-4 w-4 text-brand-green-600 mr-2 flex-shrink-0" />
              <span>{task}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm">
              <span className="text-gray-600">보상: </span>
              <span className="font-medium">{challenge.reward} ANDMAKE</span>
            </div>
            <div className="text-sm text-gray-600">
              참여자: {challenge.participants}명
            </div>
          </div>
          
          <div className="flex gap-2">
            <Link href={`/challenge/${challenge.id}`} className="flex-1">
              <Button variant="outline" fullWidth>
                상세보기
              </Button>
            </Link>
            <Button 
              variant={isParticipating ? "secondary" : "primary"} 
              onClick={handleParticipate}
              className="flex-1"
            >
              {isParticipating ? '참여중' : '참여하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}