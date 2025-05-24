import Link from 'next/link';
import { FiUsers, FiShield, FiAward, FiDatabase } from 'react-icons/fi';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import HeroSection from '../components/layout/HeroSection';
import ChallengeIdeaGenerator from '../components/layout/ChallengeIdeaGenerator';

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-br from-brand-green-900 to-dark-green text-gray-50 py-20 md:py-28 relative overflow-hidden">
        {/* 배경 패턴 및 효과 */}
        <div className="absolute inset-0 opacity-20 bg-eco-pattern"></div>
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-brand-green-400 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-[10%] w-48 h-48 bg-brand-blue-400 rounded-full opacity-10 blur-3xl animate-float-delayed"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fadeIn">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-white/10 rounded-full backdrop-blur">
              기후위기 대응 커뮤니티 DAO
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              지구를 위한 <span className="text-brand-green-300">토큰경제</span>,<br/>
              변화의 시작 <span className="text-brand-green-400">그리고만들다</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              "탄소발자국을 줄이는 나의 한걸음 한걸음... 그리고 AndMake-DAO와 함께 인증하고 보상받는 지속가능한 라이프스타일을 만들다"
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                rounded
                className="font-bold shadow-soft hover:shadow-hover transform hover:-translate-y-1 transition-all duration-300"
              >
                지금 시작하기
              </Button>
              <Link href="/about" passHref>
                <Button 
                  variant="outline" 
                  size="lg" 
                  rounded
                  className="text-white border-white/50 font-bold hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300"
                >
                  자세히 알아보기
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* 웨이브 효과 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,229.3C672,235,768,213,864,202.7C960,192,1056,192,1152,197.3C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-5 py-16 md:py-24">
        <SectionHeading 
          title={<span>저탄소 라이프스타일이 가져오는 <span className="text-brand-green-600">특별한 보상!</span></span>} 
          subtitle="지속 가능한 미래를 위해 모두가 참여하고 보상받는 AndMake-DAO에서 오늘의 챌린지를 인증하고 NFT 컬렉션을 완성하세요."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card p-6 text-center hover-lift animate-slideUp">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-green-100 text-brand-green-700 mb-4">
              <FiUsers className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">커뮤니티 참여</h3>
            <p className="text-gray-600">정책 제안과 투표를 통해 기후 대응에 함께 참여하세요.</p>
          </div>
          
          <div className="glass-card p-6 text-center hover-lift animate-slideUp" style={{animationDelay: "100ms"}}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-green-100 text-brand-green-700 mb-4">
              <FiShield className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">환경 챌린지</h3>
            <p className="text-gray-600">실천과 인증을 통해 탄소 배출 감소에 기여하고 보상받으세요.</p>
          </div>
          
          <div className="glass-card p-6 text-center hover-lift animate-slideUp" style={{animationDelay: "200ms"}}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-green-100 text-brand-green-700 mb-4">
              <FiAward className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">토큰 보상</h3>
            <p className="text-gray-600">ANDMAKE 토큰으로 친환경 활동에 대한 보상을 받고 친환경 제품을 구매하세요.</p>
          </div>
          
          <div className="glass-card p-6 text-center hover-lift animate-slideUp" style={{animationDelay: "300ms"}}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-green-100 text-brand-green-700 mb-4">
              <FiDatabase className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">탄소 마켓</h3>
            <p className="text-gray-600">ANDMAKE 토큰으로 검증된 탄소 크레딧을 거래하고 환경 보호에 기여하세요.</p>
          </div>
        </div>
        
        <HeroSection/>
        {/* --- 새로운 Gemini API 기반 챌린지 아이디어 생성기 섹션 --- */}
        <ChallengeIdeaGenerator />

        <div className="mt-10 py-12">
          <SectionHeading 
            title={<span>다양한 <span className="text-brand-green-600">환경 챌린지</span>에 참여하세요</span>}
            subtitle="환경을 생각하는 작은 실천들이 모여 큰 변화를 만듭니다. 챌린지에 참여하고 토큰 보상도 받으세요."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300 h-full flex flex-col group hover-lift animate-scaleIn">
              <div className="h-36 bg-brand-green-50 flex items-center justify-center">
                <div className="text-5xl text-brand-green-600 group-hover:scale-110 transition-transform duration-300">
                  🌿
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-semibold text-brand-green-600 uppercase tracking-wider mb-2">환경 챌린지</span>
                <h4 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-brand-green-600 transition-colors">이끼 챌린지</h4>
                <p className="text-gray-700 mb-4 text-sm flex-grow">이끼모판을 증식시키고 다른 사람에게 양도하여 기후위기에 대응하세요.</p>
                <p className="text-sm text-brand-green-800 font-medium">최대 보상: 50 ANDMAKE 토큰</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300 h-full flex flex-col group hover-lift animate-scaleIn" style={{animationDelay: "100ms"}}>
              <div className="h-36 bg-brand-green-50 flex items-center justify-center">
                <div className="text-5xl text-brand-green-600 group-hover:scale-110 transition-transform duration-300">
                  🚲
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-semibold text-brand-green-600 uppercase tracking-wider mb-2">생활 챌린지</span>
                <h4 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-brand-green-600 transition-colors">저탄소 생활 챌린지</h4>
                <p className="text-gray-700 mb-4 text-sm flex-grow">일상에서 탄소 배출을 줄이는 활동을 실천하고 인증하세요.</p>
                <p className="text-sm text-brand-green-800 font-medium">최대 보상: 30 ANDMAKE 토큰</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300 h-full flex flex-col group hover-lift animate-scaleIn" style={{animationDelay: "200ms"}}>
              <div className="h-36 bg-brand-green-50 flex items-center justify-center">
                <div className="text-5xl text-brand-green-600 group-hover:scale-110 transition-transform duration-300">
                  📚
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-semibold text-brand-green-600 uppercase tracking-wider mb-2">창작 챌린지</span>
                <h4 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-brand-green-600 transition-colors">그림동화 챌린지</h4>
                <p className="text-gray-700 mb-4 text-sm flex-grow">기후위기 극복을 위한 어른 그림 동화를 함께 만들어보세요.</p>
                <p className="text-sm text-brand-green-800 font-medium">최대 보상: 100 ANDMAKE 토큰</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover overflow-hidden transition-all duration-300 h-full flex flex-col group hover-lift animate-scaleIn" style={{animationDelay: "300ms"}}>
              <div className="h-36 bg-brand-green-50 flex items-center justify-center">
                <div className="text-5xl text-brand-green-600 group-hover:scale-110 transition-transform duration-300">
                  ♻️
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <span className="text-xs font-semibold text-brand-green-600 uppercase tracking-wider mb-2">생활 챌린지</span>
                <h4 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-brand-green-600 transition-colors">제로 웨이스트 챌린지</h4>
                <p className="text-gray-700 mb-4 text-sm flex-grow">쓰레기 배출을 최소화하는 생활 습관을 만들어보세요.</p>
                <p className="text-sm text-brand-green-800 font-medium">최대 보상: 40 ANDMAKE 토큰</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title={<span>우리의 활동 <span className="text-brand-green-600">성과</span></span>} 
            subtitle="그리고만들다 DAO 커뮤니티가 함께 이룬 기후위기 대응 활동 성과입니다."
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6 text-center hover-lift animate-slideUp">
              <p className="text-3xl md:text-4xl font-bold text-brand-green-700 mb-2">5,123</p>
              <p className="text-gray-600">참여 회원 수</p>
            </div>
            <div className="glass-card p-6 text-center hover-lift animate-slideUp" style={{animationDelay: "100ms"}}>
              <p className="text-3xl md:text-4xl font-bold text-brand-green-700 mb-2">28</p>
              <p className="text-gray-600">진행 챌린지 수</p>
            </div>
            <div className="glass-card p-6 text-center hover-lift animate-slideUp" style={{animationDelay: "200ms"}}>
              <p className="text-3xl md:text-4xl font-bold text-brand-green-700 mb-2">387,500</p>
              <p className="text-gray-600">절감 탄소량(kg)</p>
            </div>
            <div className="glass-card p-6 text-center hover-lift animate-slideUp" style={{animationDelay: "300ms"}}>
              <p className="text-3xl md:text-4xl font-bold text-brand-green-700 mb-2">254,900</p>
              <p className="text-gray-600">지급 토큰 수</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/dashboard" passHref>
              <Button 
                variant="outline" 
                size="lg" 
                className="font-bold hover:shadow-hover transform hover:-translate-y-1 transition-all duration-300"
              >
                더 많은 성과 보기
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-brand-green-900 to-dark-green text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-eco-pattern"></div>
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-brand-green-400 rounded-full opacity-20 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-[10%] w-48 h-48 bg-brand-blue-400 rounded-full opacity-10 blur-3xl animate-float-slow"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">함께 <span className="text-brand-green-400">기후위기</span>를 극복해요</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            지금 그리고만들다 DAO에 참여하고 기후위기 대응 활동을 통해 보상받고 지구도 지키세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              variant="secondary" 
              size="lg" 
              rounded
              className="font-bold shadow-soft hover:shadow-hover transform hover:-translate-y-1 transition-all duration-300"
            >
              지갑 연결하기
            </Button>
            <Link href="/challenges" passHref>
              <Button 
                variant="outline" 
                size="lg" 
                rounded
                className="text-white border-white/50 font-bold hover:bg-white/20 transform hover:-translate-y-1 transition-all duration-300"
              >
                챌린지 참여하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}