import { useState, useEffect } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import ChallengeCard from '../components/dao/ChallengeCard';
import Button from '../components/ui/Button';
import { useWallet } from '@solana/wallet-adapter-react';
import { FiFilter } from 'react-icons/fi';

export default function ChallengesPage() {
  const { connected } = useWallet();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  // 예시 데이터 로드 (실제로는 API 또는 블록체인에서 가져옴)
  useEffect(() => {
    // 실제 구현에서는 API 호출 또는 블록체인에서 데이터 가져오기
    setTimeout(() => {
      setChallenges([
        {
          id: 1,
          title: '저탄소 생활 챌린지',
          description: '일상에서 탄소 배출량을 줄이는 활동을 실천하고 인증하세요.',
          tasks: [
            '대중교통 이용하기',
            '채식 식단 실천하기',
            '에너지 절약 습관 형성하기'
          ],
          reward: 30,
          participants: 234,
          difficulty: 'easy',
          category: 'daily'
        },
        {
          id: 2,
          title: '제로 웨이스트 챌린지',
          description: '쓰레기 배출을 최소화하는 생활 습관을 만들어보세요.',
          tasks: [
            '일회용품 사용 줄이기',
            '다회용 용기 사용하기',
            '재활용 올바르게 실천하기'
          ],
          reward: 40,
          participants: 189,
          difficulty: 'medium',
          category: 'lifestyle'
        },
        {
          id: 3,
          title: '이끼 증식 챌린지',
          description: '이끼모판을 증식시키고 다른 사람에게 양도하여 보상받으세요.',
          tasks: [
            '이끼모판 증식하기',
            '이끼 관리하기',
            '이끼모판 양도하기'
          ],
          reward: 50,
          participants: 120,
          difficulty: 'medium',
          category: 'moss'
        },
        {
          id: 4,
          title: '그림동화 챌린지',
          description: '기후위기 극복을 위한 어른 그림 동화를 함께 만들어보세요.',
          tasks: [
            '스토리 제안하기',
            '그림 업로드하기',
            '챕터별 참여하기'
          ],
          reward: 100,
          participants: 78,
          difficulty: 'hard',
          category: 'storytelling'
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(challenge => challenge.category === filter);
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeading 
        title="환경 챌린지" 
        subtitle="일상에서 실천할 수 있는 다양한 환경 챌린지에 참여하고 토큰 보상을 받으세요."
      />
      
      {/* 필터 탭 - 모바일에서 스크롤 가능하게 */}
      <div className="overflow-x-auto scrollbar-hide pb-2 mb-8">
        <div className="flex items-center gap-2 min-w-max px-1">
          <FiFilter className="text-gray-500" />
          <Button 
            variant={filter === 'all' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            전체
          </Button>
          <Button 
            variant={filter === 'daily' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('daily')}
          >
            일상 생활
          </Button>
          <Button 
            variant={filter === 'lifestyle' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('lifestyle')}
          >
            라이프스타일
          </Button>
          <Button 
            variant={filter === 'moss' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('moss')}
          >
            이끼 챌린지
          </Button>
          <Button 
            variant={filter === 'storytelling' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setFilter('storytelling')}
          >
            그림동화
          </Button>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block loader"></div>
          <p className="mt-2 text-gray-600">챌린지 목록을 불러오는 중...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  );
}