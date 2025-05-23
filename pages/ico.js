import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useWallet } from '@solana/wallet-adapter-react';
import { FiClock, FiBarChart, FiUsers, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function IcoPage() {
  const { connected } = useWallet();
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState(0);
  
  // 토큰 계산 함수
  const calculateTokenAmount = (amount) => {
    // 1 SOL = 10,000 ANDMAKE 토큰
    return amount * 10000;
  };
  
  const handleAmountChange = (e) => {
    const value = e.target.value;
    setInvestmentAmount(value);
    if (value && !isNaN(value)) {
      setTokenAmount(calculateTokenAmount(parseFloat(value)));
    } else {
      setTokenAmount(0);
    }
  };
  
  const handleInvest = () => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    if (!investmentAmount || isNaN(investmentAmount) || parseFloat(investmentAmount) <= 0) {
      toast.error('유효한 금액을 입력해주세요.');
      return;
    }
    
    // 투자 로직 구현
    toast.success(`${investmentAmount} SOL 투자를 성공적으로 완료했습니다!`);
    setInvestmentAmount('');
    setTokenAmount(0);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeading 
        title="ANDMAKE 토큰 ICO 참여" 
        subtitle="그리고만들다 DAO 토큰 ICO에 참여하고 기후위기 극복 커뮤니티의 일원이 되어보세요."
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6">ICO 정보</h3>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <Card className="p-4 text-center bg-gray-50">
              <div className="flex justify-center mb-2">
                <FiClock className="h-6 w-6 text-brand-green-600" />
              </div>
              <h4 className="font-bold text-sm mb-1">ICO 기간</h4>
              <p className="text-gray-700">2025.04.01 ~ 2025.06.30</p>
            </Card>
            
            <Card className="p-4 text-center bg-gray-50">
              <div className="flex justify-center mb-2">
                <FiBarChart className="h-6 w-6 text-brand-green-600" />
              </div>
              <h4 className="font-bold text-sm mb-1">목표 금액</h4>
              <p className="text-gray-700">100,000 SOL</p>
            </Card>
            
            <Card className="p-4 text-center bg-gray-50">
              <div className="flex justify-center mb-2">
                <FiUsers className="h-6 w-6 text-brand-green-600" />
              </div>
              <h4 className="font-bold text-sm mb-1">참여자 수</h4>
              <p className="text-gray-700">1,245명</p>
            </Card>
            
            <Card className="p-4 text-center bg-gray-50">
              <div className="flex justify-center mb-2">
                <FiDollarSign className="h-6 w-6 text-brand-green-600" />
              </div>
              <h4 className="font-bold text-sm mb-1">현재 모금액</h4>
              <p className="text-gray-700">65,430 SOL (65.4%)</p>
            </Card>
          </div>
          
          <div className="mb-6">
            <h4 className="font-bold mb-2">모금 진행 현황</h4>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-brand-green-600 rounded-full" style={{ width: '65.4%' }}></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>0 SOL</span>
              <span>65,430 SOL</span>
              <span>100,000 SOL</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold mb-2">ICO 특전</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">500 SOL 이상 투자 시 <span className="font-medium">골드 크레딧 1개</span> 획득</p>
              </li>
              <li className="flex items-start">
                <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">1,000 SOL 이상 투자 시 <span className="font-medium">DAO 의사결정 영향력 2배</span> 증가</p>
              </li>
              <li className="flex items-start">
                <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">모든 ICO 참여자에게 <span className="font-medium">초기 투자자 배지</span> NFT 지급</p>
              </li>
              <li className="flex items-start">
                <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">DAO 프로젝트 투자 결정 시 <span className="font-medium">우선 참여 기회</span> 제공</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-6">ICO 참여하기</h3>
          
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              그리고만들다 DAO 토큰(ANDMAKE)은 기후위기 대응 활동에 대한 보상으로 지급되며, 친환경 제품 구매, 탄소 상쇄 프로젝트 투자, DAO 거버넌스 참여 등 다양한 방식으로 활용됩니다.
            </p>
            
            <Card className="p-4 bg-brand-green-50 mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-brand-green-600 rounded-full p-1 text-white mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold">교환 비율</h4>
              </div>
              <p className="text-gray-700">1 SOL = 10,000 ANDMAKE 토큰</p>
            </Card>
            
            <div className="mb-6">
              <label htmlFor="investment" className="block text-gray-700 font-medium mb-2">
                투자 금액 (SOL)
              </label>
              <input
                type="number"
                id="investment"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                placeholder="투자할 SOL 금액을 입력하세요"
                value={investmentAmount}
                onChange={handleAmountChange}
                min="0.1"
                step="0.1"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                받을 토큰 수량
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                <span className="font-bold">{tokenAmount.toLocaleString()}</span> ANDMAKE
              </div>
            </div>
            
            {!connected ? (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      ICO에 참여하려면 지갑을 연결해주세요.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            
            <Button
              variant="primary"
              fullWidth
              size="lg"
              className="font-bold"
              onClick={handleInvest}
              disabled={!connected || !investmentAmount || isNaN(investmentAmount) || parseFloat(investmentAmount) <= 0}
            >
              ICO 참여하기
            </Button>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-bold mb-4">유의사항</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="text-red-500 mr-2">•</div>
                <p>투자는 SOL로만 가능하며, 최소 참여 금액은 0.1 SOL입니다.</p>
              </li>
              <li className="flex items-start">
                <div className="text-red-500 mr-2">•</div>
                <p>ICO 기간 종료 후 7일 이내에 ANDMAKE 토큰이 지갑으로 전송됩니다.</p>
              </li>
              <li className="flex items-start">
                <div className="text-red-500 mr-2">•</div>
                <p>투자금은 DAO의 프로젝트 개발, 마케팅, 파트너십 구축 등에 사용됩니다.</p>
              </li>
              <li className="flex items-start">
                <div className="text-red-500 mr-2">•</div>
                <p>투자 결정 전 백서와 로드맵을 반드시 검토하시기 바랍니다.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-dark-green rounded-lg shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-4">토큰 활용 계획</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">50% - 커뮤니티 보상</h4>
            <p className="text-sm">챌린지 참여, 정책 제안, 거버넌스 활동 등에 대한 보상으로 사용됩니다.</p>
          </div>
          
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">20% - 생태계 발전</h4>
            <p className="text-sm">파트너십 구축, 친환경 기업 지원, 탄소 상쇄 프로젝트 투자에 활용됩니다.</p>
          </div>
          
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">15% - 개발 및 운영</h4>
            <p className="text-sm">플랫폼 개발, 유지보수, 인프라 구축 등 기술적 발전에 사용됩니다.</p>
          </div>
          
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">10% - 마케팅</h4>
            <p className="text-sm">커뮤니티 확장, 인지도 증진, 사용자 유치를 위한 활동에 사용됩니다.</p>
          </div>
          
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">5% - 초기 투자자</h4>
            <p className="text-sm">ICO 참여자에게 분배되어 커뮤니티의 초기 성장을 지원합니다.</p>
          </div>
          
          <div className="bg-white bg-opacity-10 p-4 rounded-lg">
            <h4 className="font-bold mb-2">5% - 긴급 예비금</h4>
            <p className="text-sm">토큰 가격 안정화, 긴급 상황 대처, 예상치 못한 비용에 대비합니다.</p>
          </div>
        </div>
        
        <p className="text-center text-sm">자세한 내용은 <a href="#" className="underline">백서</a>와 <a href="#" className="underline">로드맵</a>을 참조하세요.</p>
      </div>
    </div>
  );
}