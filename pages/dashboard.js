import { useState, useEffect } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import CarbonEmissionChart from '../components/charts/CarbonEmissionChart';
import Card from '../components/ui/Card';
import { useWallet } from '@solana/wallet-adapter-react';
import { useTokenBalance } from '../hooks/useTokenBalance';

export default function Dashboard() {
  const { connected, publicKey } = useWallet();
  const { balance, loading } = useTokenBalance('Gh7JjR64sY3UBr8N7NXQTJTgRLLnnJ6UHSFGQFyYNuxG');
  const [userStats, setUserStats] = useState(null);
  const [communityStats, setCommunityStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // 예시 데이터 로드
  useEffect(() => {
    // 로딩 상태 설정
    setIsLoading(true);
    
    if (connected) {
      // 실제 구현에서는 API 또는 블록체인에서 데이터 로드
      setUserStats({
        totalChallenges: 8,
        completedChallenges: 5,
        tokensEarned: 185,
        carbonSaved: 124,
        mossCount: 25,
        silverCredits: 0,
        goldCredits: 0,
      });
    }
    
    setCommunityStats({
      totalParticipants: 5123,
      totalChallenges: 28,
      totalTokensRewarded: 254900,
      totalCarbonSaved: 387500,
      totalMossCount: 12850,
    });
    
    // 로딩 완료
    setIsLoading(false);
  }, [connected]);
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeading 
        title="대시보드" 
        subtitle="당신과 커뮤니티의 기후위기 대응 활동을 한눈에 확인하세요."
      />
      
      {connected && userStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <h3 className="text-lg font-medium mb-2">내 토큰 잔액</h3>
            <p className="text-3xl font-bold text-brand-green-600">
              {loading ? '로딩 중...' : `${balance || userStats.tokensEarned} ANDMAKE`}
            </p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="text-lg font-medium mb-2">참여한 챌린지</h3>
            <p className="text-3xl font-bold text-brand-green-600">
              {userStats.completedChallenges}/{userStats.totalChallenges}
            </p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="text-lg font-medium mb-2">이끼 모판 수</h3>
            <p className="text-3xl font-bold text-brand-green-600">
              {userStats.mossCount}판
            </p>
          </Card>
          <Card className="text-center p-4">
            <h3 className="text-lg font-medium mb-2">절감한 탄소량</h3>
            <p className="text-3xl font-bold text-brand-green-600">
              {userStats.carbonSaved} kg
            </p>
          </Card>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <CarbonEmissionChart communitySavings={true} />
        
        {/* communityStats가 로드되었는지 확인하고 렌더링 */}
        {communityStats ? (
          <Card>
            <h3 className="text-xl font-bold mb-4">커뮤니티 통계</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium mb-2">총 참여자</h4>
                <div className="flex items-center">
                  <div className="bg-brand-green-100 h-8 rounded-lg" style={{ width: '85%' }}></div>
                  <span className="ml-3 font-bold">{communityStats.totalParticipants.toLocaleString()}명</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">진행된 챌린지</h4>
                <div className="flex items-center">
                  <div className="bg-brand-green-100 h-8 rounded-lg" style={{ width: '65%' }}></div>
                  <span className="ml-3 font-bold">{communityStats.totalChallenges}개</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">지급된 토큰</h4>
                <div className="flex items-center">
                  <div className="bg-brand-green-100 h-8 rounded-lg" style={{ width: '45%' }}></div>
                  <span className="ml-3 font-bold">{communityStats.totalTokensRewarded.toLocaleString()} ANDMAKE</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">총 탄소 절감량</h4>
                <div className="flex items-center">
                  <div className="bg-brand-green-100 h-8 rounded-lg" style={{ width: '75%' }}></div>
                  <span className="ml-3 font-bold">{communityStats.totalCarbonSaved.toLocaleString()} kg</span>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2">이끼 모판 총량</h4>
                <div className="flex items-center">
                  <div className="bg-brand-green-100 h-8 rounded-lg" style={{ width: '55%' }}></div>
                  <span className="ml-3 font-bold">{communityStats.totalMossCount.toLocaleString()}판</span>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          // 로딩 중 상태 표시
          <Card>
            <div className="p-4 text-center">
              <div className="inline-block loader"></div>
              <p className="mt-2 text-gray-600">커뮤니티 통계를 불러오는 중...</p>
            </div>
          </Card>
        )}
      </div>
      
      {!connected && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                지갑을 연결하면 개인 통계와 더 많은 기능을 이용할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* 로딩 상태에 따라 활동 요약 표시 */}
      {!isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">최근 활동</h3>
          <div className="space-y-4 divide-y divide-gray-100">
            <div className="pt-4 first:pt-0">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">저탄소 생활 챌린지</h4>
                <span className="text-sm text-brand-green-600 font-medium">+30 ANDMAKE</span>
              </div>
              <p className="text-sm text-gray-600">5일 전 인증 완료</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-green-600 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>진행률 80%</span>
                <span>4/5 완료</span>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">이끼 증식 챌린지</h4>
                <span className="text-sm text-brand-green-600 font-medium">+50 ANDMAKE</span>
              </div>
              <p className="text-sm text-gray-600">1주일 전 모판 5개 증식</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-green-600 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>진행률 25%</span>
                <span>25/100 판</span>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">그림동화 챌린지</h4>
                <span className="text-sm text-gray-500 font-medium">진행중</span>
              </div>
              <p className="text-sm text-gray-600">3일 전 스토리 제안</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>검토중</span>
                <span>-</span>
              </div>
            </div>
            
            <div className="pt-4">
              <div className="flex justify-between mb-1">
                <h4 className="font-medium">제로 웨이스트 챌린지</h4>
                <span className="text-sm text-brand-green-600 font-medium">+40 ANDMAKE</span>
              </div>
              <p className="text-sm text-gray-600">2주일 전 완료</p>
              <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-green-600 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>완료</span>
                <span>5/5 완료</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="inline-block loader"></div>
          <p className="mt-2 text-gray-600">활동 데이터를 불러오는 중...</p>
        </div>
      )}
    </div>
  );
}