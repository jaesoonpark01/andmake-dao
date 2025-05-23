import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FiShoppingCart, FiCheck, FiInfo, FiExternalLink, FiFilter, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function CarbonMarketplace() {
  const { connected } = useWallet();
  const [carbonCredits, setCarbonCredits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  // 예시 데이터 로드
  useEffect(() => {
    // 실제 구현에서는 API 또는 블록체인에서 데이터 가져오기
    setTimeout(() => {
      setCarbonCredits([
        {
          id: 1,
          name: "이끼 탄소 크레딧",
          description: "이끼 재배를 통한 탄소 흡수량에 기반한 크레딧입니다.",
          category: "moss",
          price: 35,
          supply: 10000,
          remaining: 8745,
          carbonOffset: 100, // kg
          verifier: "Climate DAO",
          location: "서울, 한국",
          image: "/images/credits/moss.jpg"
        },
        {
          id: 2,
          name: "산림 복원 크레딧",
          description: "산림 복원 프로젝트를 통해 생성된 검증된 탄소 크레딧입니다.",
          category: "forest",
          price: 45,
          supply: 5000,
          remaining: 3210,
          carbonOffset: 250, // kg
          verifier: "VERRA",
          location: "강원도, 한국",
          image: "/images/credits/forest.jpg"
        },
        {
          id: 3,
          name: "바이오차 탄소 크레딧",
          description: "바이오차 생산 및 토양 적용을 통한 탄소 격리 프로젝트입니다.",
          category: "biochar",
          price: 50,
          supply: 3000,
          remaining: 2100,
          carbonOffset: 300, // kg
          verifier: "Gold Standard",
          location: "전라남도, 한국",
          image: "/images/credits/biochar.jpg"
        },
        {
          id: 4,
          name: "해조류 재배 크레딧",
          description: "해조류 재배를 통한 탄소 흡수 및 해양 생태계 복원 프로젝트입니다.",
          category: "ocean",
          price: 40,
          supply: 7500,
          remaining: 5400,
          carbonOffset: 150, // kg
          verifier: "Blue Carbon Initiative",
          location: "부산, 한국",
          image: "/images/credits/seaweed.jpg"
        },
        {
          id: 5,
          name: "재생 에너지 전환 크레딧",
          description: "석탄 발전소를 태양광 발전소로 전환하는 프로젝트의 탄소 감축 크레딧입니다.",
          category: "energy",
          price: 60,
          supply: 15000,
          remaining: 9800,
          carbonOffset: 500, // kg
          verifier: "UNFCCC CDM",
          location: "충청남도, 한국",
          image: "/images/credits/solar.jpg"
        },
        {
          id: 6,
          name: "습지 보전 크레딧",
          description: "습지 보전 및 복원을 통한 탄소 흡수 프로젝트입니다.",
          category: "wetland",
          price: 55,
          supply: 4000,
          remaining: 3600,
          carbonOffset: 200, // kg
          verifier: "Ramsar Convention",
          location: "인천, 한국",
          image: "/images/credits/wetland.jpg"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  // 필터링된 크레딧 목록
  const filteredCredits = carbonCredits
    .filter(credit => selectedCategory === 'all' || credit.category === selectedCategory)
    .filter(credit => 
      credit.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      credit.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // 크레딧 구매 함수
  const handleBuyCredit = (creditId) => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    // 실제 구현에서는 블록체인 트랜잭션 처리
    toast.success('탄소 크레딧 구매가 완료되었습니다!');
  };
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeading 
        title="탄소 크레딧 마켓플레이스" 
        subtitle="검증된 탄소 크레딧을 ANDMAKE 토큰으로 구매하고 기후위기 대응 프로젝트에 직접 참여하세요."
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="크레딧 검색..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2 w-full md:w-auto">
            <FiFilter className="text-gray-500" />
            <Button 
              variant={selectedCategory === 'all' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              전체
            </Button>
            <Button 
              variant={selectedCategory === 'moss' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('moss')}
            >
              이끼
            </Button>
            <Button 
              variant={selectedCategory === 'forest' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('forest')}
            >
              산림
            </Button>
            <Button 
              variant={selectedCategory === 'ocean' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('ocean')}
            >
              해양
            </Button>
            <Button 
              variant={selectedCategory === 'energy' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('energy')}
            >
              에너지
            </Button>
            <Button 
              variant={selectedCategory === 'biochar' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('biochar')}
            >
              바이오차
            </Button>
            <Button 
              variant={selectedCategory === 'wetland' ? 'primary' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('wetland')}
            >
              습지
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block loader"></div>
            <p className="mt-2 text-gray-600">탄소 크레딧 정보를 불러오는 중...</p>
          </div>
        ) : (
          <>
            {filteredCredits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCredits.map((credit) => (
                  <div key={credit.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden card-hover">
                    <div className="h-40 bg-gray-200 flex items-center justify-center">
                      <div className="text-5xl text-green-800">
                        {credit.category === 'moss' && '🌿'}
                        {credit.category === 'forest' && '🌳'}
                        {credit.category === 'ocean' && '🌊'}
                        {credit.category === 'energy' && '☀️'}
                        {credit.category === 'biochar' && '🔥'}
                        {credit.category === 'wetland' && '🌾'}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">{credit.name}</h3>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {credit.category === 'moss' && '이끼'}
                          {credit.category === 'forest' && '산림'}
                          {credit.category === 'ocean' && '해양'}
                          {credit.category === 'energy' && '에너지'}
                          {credit.category === 'biochar' && '바이오차'}
                          {credit.category === 'wetland' && '습지'}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">{credit.description}</p>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="text-sm">
                          <span className="text-gray-500">가격:</span>
                          <span className="font-medium ml-1">{credit.price} ANDMAKE</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">남은 수량:</span>
                          <span className="font-medium ml-1">{credit.remaining.toLocaleString()}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">탄소상쇄:</span>
                          <span className="font-medium ml-1">{credit.carbonOffset} kg</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">인증기관:</span>
                          <span className="font-medium ml-1">{credit.verifier}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="secondary" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => window.open(`https://carbonregistry.com/credit/${credit.id}`, '_blank')}
                        >
                          <FiInfo className="mr-1" />
                          상세정보
                        </Button>
                        <Button 
                          variant="primary" 
                          size="sm"
                          className="flex items-center"
                          onClick={() => handleBuyCredit(credit.id)}
                        >
                          <FiShoppingCart className="mr-1" />
                          구매하기
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}
          </>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <h3 className="text-xl font-bold mb-4">탄소 크레딧이란?</h3>
          <p className="text-gray-700 mb-4">
            탄소 크레딧은 온실가스 배출을 감축하거나 제거한 것을 인증하는 단위입니다. 
            1개의 탄소 크레딧은 1톤의 이산화탄소 또는 이에 상응하는 온실가스를 감축한 것을 의미합니다.
          </p>
          <p className="text-gray-700 mb-4">
            이 마켓플레이스에서는 다양한 환경 프로젝트에서 생성된 검증된 탄소 크레딧을 
            ANDMAKE 토큰으로 구매할 수 있습니다. 모든 크레딧은 공인된 기관의 검증을 
            거쳤으며, 블록체인에 기록되어 투명성을 보장합니다.
          </p>
          <div className="flex items-center text-green-700">
            <FiExternalLink className="mr-2" />
            <a href="https://carbonregistry.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
              탄소 크레딧 레지스트리 방문하기
            </a>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-xl font-bold mb-4">구매 방법</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 text-green-800 mr-3 mt-0.5">
                <FiCheck className="h-4 w-4" />
              </div>
              <p className="text-gray-700">원하는 탄소 크레딧 상품을 선택하고 "구매하기" 버튼을 클릭합니다.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 text-green-800 mr-3 mt-0.5">
                <FiCheck className="h-4 w-4" />
              </div>
              <p className="text-gray-700">구매 금액만큼의 ANDMAKE 토큰이 지갑에 있는지 확인합니다.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 text-green-800 mr-3 mt-0.5">
                <FiCheck className="h-4 w-4" />
              </div>
              <p className="text-gray-700">거래를 승인하면 블록체인에 기록되고 크레딧이 구매자의 지갑으로 전송됩니다.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 text-green-800 mr-3 mt-0.5">
                <FiCheck className="h-4 w-4" />
              </div>
              <p className="text-gray-700">구매한 크레딧은 개인 포트폴리오에서 확인할 수 있으며, 탄소 상쇄 인증서로 활용할 수 있습니다.</p>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 rounded-full p-1 text-green-800 mr-3 mt-0.5">
                <FiCheck className="h-4 w-4" />
              </div>
              <p className="text-gray-700">판매 수익금은 해당 환경 프로젝트에 직접 지원됩니다.</p>
            </li>
          </ul>
        </Card>
      </div>
      
      <div className="bg-green-950 text-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">탄소 크레딧 판매 제안</h3>
        <p className="mb-6">
          자체적인 환경 프로젝트를 통해 생성된 탄소 크레딧이 있으신가요? 
          그리고만들다 DAO 마켓플레이스에 등록하여 전 세계 구매자들에게 판매할 수 있습니다.
        </p>
        <div className="flex justify-center">
          <Button 
            variant="secondary" 
            size="lg"
            rounded
            className="font-bold"
          >
            판매 제안하기
          </Button>
        </div>
      </div>
    </div>
  );
}