import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useWallet } from '@solana/wallet-adapter-react';
import { FiPlus, FiClock, FiGift } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function MossChallengePage() {
  const { connected } = useWallet();
  const [mossCount, setMossCount] = useState(0);
  const [silverCredits, setSilverCredits] = useState(0);
  const [goldCredits, setGoldCredits] = useState(0);
  
  const handleBuyMoss = () => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    // 모판 구매 로직
    setMossCount(prev => prev + 1);
    toast.success('이끼 모판을 성공적으로 구매했습니다!');
  };
  
  const handleGrowMoss = () => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    if (mossCount === 0) {
      toast.error('증식할 이끼 모판이 없습니다.');
      return;
    }
    
    // 모판 증식 로직
    setMossCount(prev => prev + 1);
    toast.success('이끼 모판을 성공적으로 증식했습니다!');
    
    // 100판 달성 시 실버 크레딧 획득
    if ((mossCount + 1) % 100 === 0) {
      setSilverCredits(prev => prev + 1);
      toast.success('축하합니다! 실버 크레딧을 획득했습니다!', {
        icon: '🥈',
        duration: 5000
      });
    }
    
    // 실버 크레딧 10개 달성 시 골드 크레딧 획득
    if (silverCredits === 9 && (mossCount + 1) % 100 === 0) {
      setGoldCredits(prev => prev + 1);
      setSilverCredits(0);
      toast.success('축하합니다! 골드 크레딧을 획득하여 DAO에 가입되었습니다!', {
        icon: '🥇',
        duration: 5000
      });
    }
  };
  
  const handleTransferMoss = () => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    if (mossCount === 0) {
      toast.error('양도할 이끼 모판이 없습니다.');
      return;
    }
    
    // 모판 양도 로직
    setMossCount(prev => prev - 1);
    toast.success('이끼 모판을 성공적으로 양도했습니다! 20 ANDMAKE 토큰을 보상으로 받았습니다.');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeading 
        title="이끼 증식 챌린지" 
        subtitle="이끼모판을 증식하고 양도하여 기후위기 극복에 동참하세요. 탄소 흡수원 역할을 하는 이끼를 키우고 보상도 받아가세요."
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">내 이끼 현황</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-brand-green-50 p-4 text-center">
            <h4 className="font-bold mb-2">보유 모판</h4>
            <p className="text-3xl font-bold text-brand-green-600">{mossCount}판</p>
            <p className="text-sm text-gray-600 mt-2">증식 중인 이끼 모판 수</p>
          </Card>
          
          <Card className="bg-gray-100 p-4 text-center">
            <h4 className="font-bold mb-2">실버 크레딧</h4>
            <p className="text-3xl font-bold text-gray-700">{silverCredits}개</p>
            <p className="text-sm text-gray-600 mt-2">100판 증식 시 1개 획득</p>
          </Card>
          
          <Card className="bg-yellow-50 p-4 text-center">
             <h4 className="font-bold mb-2">골드 크레딧</h4>
             <p className="text-3xl font-bold text-yellow-600">{goldCredits}개</p>
             <p className="text-sm text-gray-600 mt-2">실버 크레딧 10개 = 골드 1개</p>
          </Card>
</div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            variant="primary" 
            onClick={handleBuyMoss}
            className="flex items-center"
            disabled={!connected}
          >
            <FiPlus className="mr-2" />
            이끼 모판 구매
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={handleGrowMoss}
            className="flex items-center"
            disabled={!connected || mossCount === 0}
          >
            <FiClock className="mr-2" />
            이끼 증식하기
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleTransferMoss}
            className="flex items-center"
            disabled={!connected || mossCount === 0}
          >
            <FiGift className="mr-2" />
            이끼 모판 양도하기
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">이끼 챌린지 혜택</h3>
          
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700">모판 1판 증식 시 <span className="font-medium">10 ANDMAKE</span> 토큰 보상</p>
            </li>
            <li className="flex items-start">
              <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700">이끼 모판 양도 시 양수자/양도자 모두 <span className="font-medium">20 ANDMAKE</span> 토큰 보상</p>
            </li>
            <li className="flex items-start">
              <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700">100판 증식 시 <span className="font-medium">실버 크레딧 1개</span> 획득</p>
            </li>
            <li className="flex items-start">
              <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700">실버 크레딧 10개 모으면 <span className="font-medium">골드 크레딧 1개</span> 획득 및 DAO 가입</p>
            </li>
            <li className="flex items-start">
              <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700">또는 <span className="font-medium">5,000,000 ANDMAKE</span> 토큰 보유 시 골드 크레딧 1개 획득</p>
            </li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">이끼의 환경적 효과</h3>
          
          <div className="space-y-4">
            <p className="text-gray-700">이끼는 대기 중 이산화탄소를 흡수하고 산소를 방출하는 중요한 <span className="font-medium">탄소 흡수원</span>입니다. 또한 다음과 같은 환경적 효과가 있습니다:</p>
            
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>습도 조절 및 공기 정화 기능</li>
              <li>토양 침식 방지와 수질 정화</li>
              <li>도시 열섬 현상 완화</li>
              <li>생물 다양성 증진</li>
              <li>작은 공간에서도 쉽게 증식 가능</li>
            </ul>
            
            <p className="text-gray-700 mt-4">이끼 모판 100판 기준으로 연간 약 <span className="font-medium">500kg의 이산화탄소를 흡수</span>할 수 있어, 기후위기 대응에 중요한 역할을 합니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}          