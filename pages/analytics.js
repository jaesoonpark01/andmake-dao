import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import CarbonEmissionChart from '../components/charts/CarbonEmissionChart';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import { FiDownload, FiRefreshCw, FiCalendar, FiInfo, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
  const { connected } = useWallet();
  const [timeRange, setTimeRange] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [insightIndex, setInsightIndex] = useState(0);
  
  // 머신러닝 인사이트 예시
  const insights = [
    "이끼 챌린지 참여자는 평균 20% 더 많은 탄소 저감 활동에 참여합니다.",
    "저탄소 식단 챌린지는 참여자당 연간 약 500kg의 CO2 감축 효과가 있습니다.",
    "서울 지역 참여자들은 주로 대중교통 관련 챌린지에 활발히 참여하고 있습니다.",
    "참여자들은 주중보다 주말에 43% 더 많은 탄소 저감 활동을 인증합니다.",
    "플랫폼 내에서 가장 높은 참여율을 보이는 연령대는 25-34세입니다."
  ];
  
  useEffect(() => {
    // 실제 구현에서는 API 또는 블록체인에서 데이터 가져오기
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 인사이트 순환
  useEffect(() => {
    const insightTimer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % insights.length);
    }, 5000);
    
    return () => clearInterval(insightTimer);
  }, [insights.length]);
  
  // 데이터 새로고침 처리
  const handleRefreshData = () => {
    setLoading(true);
    
    // 실제 구현에서는 데이터 다시 가져오기
    setTimeout(() => {
      setLoading(false);
      toast.success('데이터가 업데이트되었습니다.');
    }, 1000);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeading 
        title="탄소 데이터 분석" 
        subtitle="머신러닝을 활용한 탄소 배출량 및 저감 활동 분석 대시보드입니다."
      />
      
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2">
          <FiCalendar className="text-gray-500" />
          <Button 
            variant={timeRange === 'weekly' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('weekly')}
          >
            주간
          </Button>
          <Button 
            variant={timeRange === 'monthly' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('monthly')}
          >
            월간
          </Button>
          <Button 
            variant={timeRange === 'quarterly' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('quarterly')}
          >
            분기별
          </Button>
          <Button 
            variant={timeRange === 'yearly' ? 'primary' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('yearly')}
          >
            연간
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center"
            onClick={handleRefreshData}
          >
            <FiRefreshCw className="mr-2" />
            새로고침
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            className="flex items-center"
            onClick={() => toast.success('데이터가 다운로드되었습니다.')}
          >
            <FiDownload className="mr-2" />
            데이터 다운로드
          </Button>
        </div>
      </div>
      
      {/* ML 인사이트 섹션 */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white rounded-lg p-6 mb-8 shadow-md">
        <div className="flex items-start">
          <FiInfo className="h-6 w-6 mr-3 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold mb-2">머신러닝 인사이트</h3>
            <p className="text-lg transition-all duration-500 ease-in-out">
              {insights[insightIndex]}
            </p>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block loader"></div>
          <p className="mt-2 text-gray-600">분석 데이터를 불러오는 중...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <CarbonEmissionChart
              communitySavings={true}
              title={`${timeRange === 'weekly' ? '주간' : timeRange === 'monthly' ? '월간' : timeRange === 'quarterly' ? '분기별' : '연간'} 탄소 배출량 추이`}
            />
            <PieChart
              title="챌린지별 탄소 저감량 비율"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <BarChart
              title="지역별 참여자 수 및 탄소 저감량"
            />
            
            <Card>
              <h3 className="text-xl font-bold mb-4">탄소 저감 예측 분석</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">예상 연간 탄소 저감량</h4>
                  <div className="bg-gray-100 h-6 rounded-full overflow-hidden mb-1">
                    <div className="bg-green-600 h-full" style={{ width: '68%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>현재: 387,500 kg</span>
                    <span>목표: 500,000 kg</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">참여자 증가율</h4>
                  <div className="bg-gray-100 h-6 rounded-full overflow-hidden mb-1">
                    <div className="bg-blue-600 h-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>현재: 5,123명</span>
                    <span>예상(3개월 후): 8,945명</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">토큰 순환 효율성</h4>
                  <div className="bg-gray-100 h-6 rounded-full overflow-hidden mb-1">
                    <div className="bg-purple-600 h-full" style={{ width: '82%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>현재: 82%</span>
                    <span>목표: 95%</span>
                  </div>
                </div>
                
                <div className="pt-4 text-sm text-gray-700">
                  <p className="font-medium">ML 모델 예측:</p>
                  <p>현재 추세가 계속된다면, 6개월 내에 연간 탄소 저감량 목표를 달성할 것으로 예상됩니다. 가장 효과적인 탄소 저감 활동은 이끼 챌린지와 저탄소 식단입니다.</p>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">맞춤형 탄소 저감 추천</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-green-50 border border-green-100">
                <h4 className="font-bold mb-3">개인 맞춤형 챌린지</h4>
                <p className="text-gray-700 text-sm mb-4">
                  사용자의 활동 패턴과 선호도를 분석하여 가장 효과적인 탄소 저감 챌린지를 추천합니다.
                </p>
                <div className="pt-2 border-t border-green-100">
                  <p className="text-sm font-medium text-green-700">
                    {connected ? '추천 챌린지: 자전거 출퇴근 30일' : '지갑을 연결하면 맞춤형 추천을 받을 수 있습니다.'}
                  </p>
                </div>
              </Card>
              
              <Card className="bg-blue-50 border border-blue-100">
                <h4 className="font-bold mb-3">지역별 최적 활동</h4>
                <p className="text-gray-700 text-sm mb-4">
                  사용자의 지역에 최적화된 탄소 저감 활동을 추천합니다. 지역 특성과 인프라를 고려한 맞춤형 추천입니다.
                </p>
                <div className="pt-2 border-t border-blue-100">
                  <p className="text-sm font-medium text-blue-700">
                    {connected ? '서울 지역 추천: 도시 숲 조성 참여' : '지갑을 연결하면 지역별 추천을 받을 수 있습니다.'}
                  </p>
                </div>
              </Card>
              
              <Card className="bg-purple-50 border border-purple-100">
                <h4 className="font-bold mb-3">탄소 저감 예측</h4>
                <p className="text-gray-700 text-sm mb-4">
                  현재 활동을 지속할 경우의 예상 탄소 저감량과 추가적인 활동으로 달성 가능한 목표를 제시합니다.
                </p>
                <div className="pt-2 border-t border-purple-100">
                  <p className="text-sm font-medium text-purple-700">
                    {connected ? '올해 예상 저감량: 1.2톤 CO₂' : '지갑을 연결하면 개인 예측을 확인할 수 있습니다.'}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}
      
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">더 자세한 분석이 필요하신가요?</p>
        <Button variant="dark" size="lg" className="font-bold">
          고급 분석 보고서 생성하기
        </Button>
      </div>
    </div>
  );
}