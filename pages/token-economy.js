import { useState, useEffect } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import TokenStats from '../components/dao/TokenStats';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useWallet } from '@solana/wallet-adapter-react';
import { FiDollarSign, FiShoppingBag, FiShield, FiUsers, FiBarChart2 } from 'react-icons/fi';

export default function TokenEconomy() {
  const { connected } = useWallet();
  const [tokenStats, setTokenStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 예시 데이터 로드 (실제로는 API 또는 블록체인에서 가져옴)
  useEffect(() => {
    // 실제 구현에서는 API 호출 또는 블록체인에서 데이터 가져오기
    setTimeout(() => {
      setTokenStats({
        price: "0.35 SOL",
        circulatingSupply: "450,000 ANDMAKE",
        holders: "5,123",
        marketCap: "157,500 SOL",
        totalSupply: "1,000,000 ANDMAKE",
        tokenContract: "Gh7JjR64sY3UBr8N7NXQTJTgRLLnnJ6UHSFGQFyYNuxG",
      });
      setLoading(false);
    }, 1000);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeading 
        title="토큰 이코노미" 
        subtitle="ANDMAKE 토큰은 기후위기 대응 활동에 대한 보상으로 지급되며, 커뮤니티 내 다양한 형태로 활용됩니다."
      />
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block loader"></div>
          <p className="mt-2 text-gray-600">토큰 정보를 불러오는 중...</p>
        </div>
      ) : (
        <>
          <TokenStats stats={tokenStats} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="h-full">
              <h3 className="text-xl font-bold mb-4">토큰 획득 방법</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-brand-green-600 rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                    <FiDollarSign className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">정책 제안 및 승인</p>
                    <p className="text-sm text-gray-600">정책을 제안하고 커뮤니티에서 승인받으면 50-200 ANDMAKE 토큰을 보상받습니다. 정책의 규모와 영향력에 따라 보상이 달라집니다.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-green-600 rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                    <FiShield className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">챌린지 참여 및 완료</p>
                    <p className="text-sm text-gray-600">환경 챌린지에 참여하고 성공적으로 완료하면 20-100 ANDMAKE 토큰을 얻을 수 있습니다. 챌린지의 난이도와 지속 기간에 따라 보상이 달라집니다.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-green-600 rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                    <FiUsers className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">투표 참여</p>
                    <p className="text-sm text-gray-600">커뮤니티 내 정책 투표에 참여하면 5 ANDMAKE 토큰을 보상받습니다. 적극적인 거버넌스 참여를 장려합니다.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-green-600 rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                    <FiBarChart2 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">ICO 참여</p>
                    <p className="text-sm text-gray-600">초기 토큰 발행 시 SOL을 통한 투자로 ANDMAKE 토큰을 획득할 수 있습니다. 1 SOL = 10,000 ANDMAKE의 비율로 교환됩니다.</p>
                  </div>
                </li>
              </ul>
            </Card>
            
            <Card className="h-full">
              <h3 className="text-xl font-bold mb-4">토큰 활용 방법</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-brand-green-600 rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                    <FiShoppingBag className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">친환경 제품 구매</p>
                    <p className="text-sm text-gray-600">제휴 매장에서 친환경 제품 구매 시 할인 또는 결제 수단으로 활용할 수 있습니다. 현재 30개 이상의 매장과 제휴 중입니다.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-green-600 rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">탄소 상쇄 프로젝트 투자</p>
                    <p className="text-sm text-gray-600">토큰을 탄소 상쇄 프로젝트에 투자하여 환경 보호에 기여할 수 있습니다. 투자 수익의 일부도 돌려받을 수 있습니다.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-green-600 rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">거버넌스 영향력 강화</p>
                    <p className="text-sm text-gray-600">토큰을 많이 보유할수록 DAO 커뮤니티 내 의사결정 영향력이 커집니다. 정책 제안 및 투표 과정에서 영향력을 행사할 수 있습니다.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-green-600 rounded-full p-2 mr-3 mt-0.5 flex-shrink-0">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">DAO 크레딧 획득</p>
                    <p className="text-sm text-gray-600">5,000,000 ANDMAKE 토큰을 모으면 골드 크레딧을 획득하여 DAO에 가입할 수 있습니다. 또는 이끼 모판 100판 증식을 통해 실버 크레딧을 모을 수도 있습니다.</p>
                  </div>
                </li>
              </ul>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
            <div className="bg-dark-green text-white p-4">
              <h3 className="text-xl font-bold">토큰 파트너십</h3>
            </div>
            <div className="p-4 md:p-6">
              <p className="text-gray-700 mb-6">그리고만들다 DAO는 다양한 친환경 기업 및 단체와 파트너십을 맺고 있습니다. 파트너사에서 ANDMAKE 토큰을 사용하여 제품을 구매하거나 서비스를 이용할 수 있습니다.</p>
              
              <h4 className="font-bold text-lg mb-4">파트너사</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-100 p-4 h-16 md:h-24 flex items-center justify-center rounded-lg">
                  <p className="text-center font-medium">친환경 마켓 A</p>
                </div>
                <div className="bg-gray-100 p-4 h-16 md:h-24 flex items-center justify-center rounded-lg">
                  <p className="text-center font-medium">에코 브랜드 B</p>
                </div>
                <div className="bg-gray-100 p-4 h-16 md:h-24 flex items-center justify-center rounded-lg">
                  <p className="text-center font-medium">제로웨이스트 숍 C</p>
                </div>
                <div className="bg-gray-100 p-4 h-16 md:h-24 flex items-center justify-center rounded-lg">
                  <p className="text-center font-medium">환경단체 D</p>
                </div>
              </div>
              
              <div className="text-center">
                <Button variant="primary" size="md">
                  파트너십 제안하기
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-dark-green rounded-lg shadow-md p-6 text-white mb-8">
            <h3 className="text-xl font-bold mb-6">토큰 이코노미 흐름도</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-center">토큰 생성</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="text-green-300 mr-2">•</div>
                    <p>ICO를 통한 초기 발행</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-300 mr-2">•</div>
                    <p>챌린지 보상으로 지속적 발행</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-300 mr-2">•</div>
                    <p>정책 제안 및 투표 보상</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-center">토큰 사용</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="text-green-300 mr-2">•</div>
                    <p>친환경 제품 구매</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-300 mr-2">•</div>
                    <p>탄소 상쇄 프로젝트 투자</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-300 mr-2">•</div>
                    <p>거버넌스 영향력 행사</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h4 className="font-bold mb-2 text-center">토큰 순환</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="text-green-300 mr-2">•</div>
                    <p>DAO 기금으로 환원</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-300 mr-2">•</div>
                    <p>환경 프로젝트 재투자</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-green-300 mr-2">•</div>
                    <p>토큰 홀더 보상</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="text-center text-sm italic">지속가능한 토큰 이코노미는 환경 보호와 커뮤니티 성장을 동시에 추구합니다.</p>
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 mb-6">ANDMAKE 토큰에 대해 더 자세히 알아보기</p>
            <Button 
              variant="primary" 
              size="lg" 
              rounded 
              className="font-bold"
              onClick={() => window.open(`https://explorer.solana.com/address/${tokenStats.tokenContract}`, '_blank')}
            >
              토큰 컨트랙트 확인하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}