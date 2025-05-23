import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  FiBook, 
  FiDownload, 
  FiShare2, 
  FiChevronDown, 
  FiChevronUp,
  FiTarget,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiGlobe,
  FiLayers
} from 'react-icons/fi';

export default function WhitepaperPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});
  const [scrollProgress, setScrollProgress] = useState(0);

  // 스크롤 진행률 계산
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 섹션 토글
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // 섹션으로 스크롤
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 백서 다운로드
  const downloadWhitepaper = () => {
    // 실제 구현에서는 PDF 파일 다운로드 로직 추가
    const link = document.createElement('a');
    link.href = '/documents/andmake-dao-whitepaper.pdf';
    link.download = 'AndMake-DAO-Whitepaper.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 공유하기
  const shareWhitepaper = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AndMake DAO 백서',
          text: '기후위기 극복을 위한 블록체인 기반 탈중앙화 자율조직',
          url: window.location.href,
        });
      } catch (err) {
        console.log('공유 취소됨');
      }
    } else {
      // 클립보드에 URL 복사
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* 진행률 바 */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-brand-green-600 to-brand-blue-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md mb-6">
            <FiBook className="mr-2 text-brand-green-600" />
            <span className="font-medium text-gray-700">AndMake DAO 백서</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-green-600 to-brand-blue-600 bg-clip-text text-transparent">
            기후위기 극복을 위한<br />블록체인 기반 탈중앙화 자율조직
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            "인간이기에 기후위기를 극복해야하는 우리들의 소소한 일상이야기"
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button 
              variant="primary" 
              size="lg" 
              className="flex items-center"
              onClick={downloadWhitepaper}
            >
              <FiDownload className="mr-2" />
              백서 다운로드 (PDF)
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="flex items-center"
              onClick={shareWhitepaper}
            >
              <FiShare2 className="mr-2" />
              공유하기
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 목차 사이드바 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">목차</h3>
              <nav className="space-y-2">
                {[
                  { id: 'overview', title: '개요', icon: FiTarget },
                  { id: 'problem', title: '문제 정의', icon: FiShield },
                  { id: 'solution', title: '솔루션', icon: FiLayers },
                  { id: 'technology', title: '기술 아키텍처', icon: FiGlobe },
                  { id: 'tokenomics', title: '토큰 이코노미', icon: FiTrendingUp },
                  { id: 'governance', title: '거버넌스 구조', icon: FiUsers },
                  { id: 'challenges', title: '챌린지 생태계', icon: FiTarget },
                  { id: 'roadmap', title: '로드맵', icon: FiTrendingUp }
                ].map(({ id, title, icon: Icon }) => (
                  <button
                    key={id}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${
                      activeSection === id 
                        ? 'bg-brand-green-100 text-brand-green-700' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => scrollToSection(id)}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* 개요 섹션 */}
            <section id="overview" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="개요" 
                  subtitle="AndMake DAO의 미션과 비전" 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-brand-green-50 to-brand-green-100 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-brand-green-800">미션</h4>
                    <p className="text-gray-700">
                      기후위기라는 인류 최대 과제에 대응하기 위해 개인의 일상적 실천을 블록체인 기술로 연결하여 
                      집단 지성과 행동력을 극대화하는 탈중앙화 플랫폼을 구축합니다.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-brand-blue-50 to-brand-blue-100 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-3 text-brand-blue-800">비전</h4>
                    <ul className="text-gray-700 space-y-2">
                      <li>• 개인: 기후 친화적 생활습관의 게임화</li>
                      <li>• 커뮤니티: 탈중앙화 거버넌스</li>
                      <li>• 사회: 투명한 보상체계</li>
                      <li>• 생태계: 글로벌 연대와 탄소저감</li>
                    </ul>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: '투명성', desc: '블록체인 기반 검증', color: 'green' },
                    { title: '참여성', desc: '개방형 거버넌스', color: 'blue' },
                    { title: '지속가능성', desc: '실질적 환경 기여', color: 'purple' },
                    { title: '혁신성', desc: '새로운 협력 모델', color: 'orange' }
                  ].map(({ title, desc, color }) => (
                    <div key={title} className={`bg-${color}-50 p-4 rounded-lg text-center`}>
                      <h5 className={`font-bold text-${color}-700 mb-2`}>{title}</h5>
                      <p className={`text-${color}-600 text-sm`}>{desc}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* 문제 정의 섹션 */}
            <section id="problem" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="문제 정의" 
                  subtitle="현재 기후위기 대응의 한계점" 
                />
                
                <div className="space-y-6">
                  {[
                    {
                      title: '기후위기 대응의 한계',
                      problems: [
                        '개별 기후행동의 효과 측정 및 보상 체계 부재',
                        '기존 기후정책의 소수 전문가 중심 결정 구조',
                        '장기적 환경 효과에 대한 즉각적 보상 체계 부족',
                        '탄소 저감 활동의 검증과 추적 시스템 미비'
                      ]
                    },
                    {
                      title: '기존 환경 플랫폼의 문제점',
                      problems: [
                        '특정 기업이나 기관에 종속된 중앙화된 운영 구조',
                        '지속적인 참여 유도를 위한 경제적 인센티브 부족',
                        '실제 환경 기여도에 대한 객관적 검증 체계 미흡',
                        '지역별로 분산된 활동으로 규모의 경제 효과 제한'
                      ]
                    },
                    {
                      title: '토큰 이코노미의 한계',
                      problems: [
                        '실질적 가치 창출 없는 투기적 토큰 발행과 거래',
                        '단기적 수익에 집중한 불안정한 토큰 생태계',
                        '실제 환경 개선 효과와 연계되지 않은 보상 체계'
                      ]
                    }
                  ].map(({ title, problems }, index) => (
                    <div key={index} className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                      <h4 className="font-bold text-lg mb-4 text-red-700">{title}</h4>
                      <ul className="space-y-2">
                        {problems.map((problem, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <span className="text-red-500 mr-2">•</span>
                            {problem}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* 솔루션 섹션 */}
            <section id="solution" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="솔루션" 
                  subtitle="AndMake DAO의 혁신적 접근법" 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: '블록체인 기반 투명한 기후행동 추적',
                      icon: FiShield,
                      features: [
                        'Solana 블록체인을 활용한 데이터 불변성 보장',
                        '실시간 탄소저감량 추적 및 검증',
                        '투명한 보상 분배 시스템'
                      ],
                      color: 'green'
                    },
                    {
                      title: '탈중앙화 거버넌스',
                      icon: FiUsers,
                      features: [
                        '커뮤니티 구성원의 직접적 정책 제안 및 투표',
                        '토큰 기반 가중 투표로 참여도 반영',
                        '자동화된 정책 실행으로 투명성 확보'
                      ],
                      color: 'blue'
                    },
                    {
                      title: '다층적 챌린지 생태계',
                      icon: FiTarget,
                      features: [
                        '개인 챌린지: 일상 속 탄소저감 활동',
                        '협력 챌린지: 이끼 증식, 도시농업 등',
                        '창작 챌린지: 기후위기 인식 개선 콘텐츠'
                      ],
                      color: 'purple'
                    },
                    {
                      title: '실질적 가치 기반 토큰 이코노미',
                      icon: FiTrendingUp,
                      features: [
                        '실제 탄소저감량과 연동된 토큰 발행',
                        '친환경 제품 구매 및 탄소상쇄 투자 활용',
                        '지속가능한 순환 경제 구조 구축'
                      ],
                      color: 'orange'
                    }
                  ].map(({ title, icon: Icon, features, color }, index) => (
                    <div key={index} className={`bg-${color}-50 border border-${color}-200 p-6 rounded-lg`}>
                      <div className={`flex items-center mb-4 text-${color}-700`}>
                        <Icon className="mr-3 h-6 w-6" />
                        <h4 className="font-bold text-lg">{title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {features.map((feature, idx) => (
                          <li key={idx} className={`flex items-start text-${color}-700`}>
                            <span className={`text-${color}-500 mr-2`}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* 기술 아키텍처 섹션 */}
            <section id="technology" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="기술 아키텍처" 
                  subtitle="Solana 기반 확장 가능한 인프라" 
                />
                
                <div className="mb-8">
                  <h4 className="font-bold text-xl mb-4">Solana 블록체인 선택 이유</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { metric: '65,000 TPS', label: '확장성', desc: '초당 트랜잭션 처리' },
                      { metric: '$0.00025', label: '저비용', desc: '평균 거래 수수료' },
                      { metric: 'PoH', label: '에너지 효율', desc: 'Proof of History' },
                      { metric: 'Rust', label: '개발 친화', desc: '스마트 컨트랙트' }
                    ].map(({ metric, label, desc }, index) => (
                      <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-brand-green-600 mb-2">{metric}</div>
                        <div className="font-medium text-gray-800">{label}</div>
                        <div className="text-sm text-gray-600">{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-4">스마트 컨트랙트 구조</h4>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`pub mod climate_dao {
    // 거버넌스 기능
    - create_proposal: 정책 제안 생성
    - vote_proposal: 제안에 대한 투표
    - execute_proposal: 승인된 정책 자동 실행
    
    // 챌린지 관리
    - create_challenge: 새로운 챌린지 생성
    - participate_challenge: 챌린지 참여
    - verify_submission: 활동 검증 및 보상 지급
    
    // 토큰 관리
    - mint_reward: 활동 기반 토큰 발행
    - transfer_tokens: 토큰 전송
    - stake_tokens: 토큰 스테이킹
}`}
                    </pre>
                  </div>
                </div>
              </Card>
            </section>

            {/* 토큰 이코노미 섹션 */}
            <section id="tokenomics" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="토큰 이코노미" 
                  subtitle="ANDMAKE 토큰의 구조와 활용" 
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-bold text-lg mb-4">토큰 개요</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium">토큰명:</span>
                        <span>ANDMAKE ($ANDMAKE)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">블록체인:</span>
                        <span>Solana</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">총 공급량:</span>
                        <span>1,000,000,000 ANDMAKE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">토큰 표준:</span>
                        <span>SPL Token</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4">토큰 분배</h4>
                    <div className="space-y-2">
                      {[
                        { label: '커뮤니티 보상', percent: 40, color: 'green' },
                        { label: '생태계 발전', percent: 20, color: 'blue' },
                        { label: '개발 및 운영', percent: 15, color: 'purple' },
                        { label: '초기 투자자', percent: 10, color: 'orange' },
                        { label: '마케팅 및 성장', percent: 10, color: 'pink' },
                        { label: '긴급 예비금', percent: 5, color: 'gray' }
                      ].map(({ label, percent, color }) => (
                        <div key={label} className="flex items-center">
                          <div className="w-24 text-sm">{label}</div>
                          <div className="flex-1 bg-gray-200 rounded-full h-3 mx-3">
                            <div 
                              className={`bg-${color}-500 h-3 rounded-full`}
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                          <div className="w-12 text-sm font-medium">{percent}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-4 text-green-700">토큰 획득 방법</h4>
                    <ul className="space-y-2 text-green-700">
                      <li>• 일상 챌린지: 5-30 ANDMAKE</li>
                      <li>• 이끼 증식: 10-20 ANDMAKE</li>
                      <li>• 창작 활동: 50-100 ANDMAKE</li>
                      <li>• 거버넌스 참여: 5-200 ANDMAKE</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-bold text-lg mb-4 text-blue-700">토큰 활용 방안</h4>
                    <ul className="space-y-2 text-blue-700">
                      <li>• 친환경 제품 구매</li>
                      <li>• 탄소상쇄 프로젝트 투자</li>
                      <li>• DAO 크레딧 획득</li>
                      <li>• 거버넌스 영향력 강화</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </section>

            {/* 거버넌스 구조 섹션 */}
            <section id="governance" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="거버넌스 구조" 
                  subtitle="민주적이고 투명한 의사결정 시스템" 
                />
                
                <div className="mb-8">
                  <h4 className="font-bold text-lg mb-4">참여 등급 시스템</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-4 py-2 text-left">등급</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">자격 조건</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">투표권</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">제안권</th>
                          <th className="border border-gray-300 px-4 py-2 text-left">특별 혜택</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { 
                            grade: '브론즈', 
                            condition: 'ANDMAKE 보유', 
                            vote: '1x', 
                            proposal: '❌', 
                            benefit: '기본 챌린지 참여',
                            color: 'orange'
                          },
                          { 
                            grade: '실버', 
                            condition: '이끼 100판 OR 50,000 ANDMAKE', 
                            vote: '2x', 
                            proposal: '✅', 
                            benefit: '특별 챌린지 접근',
                            color: 'gray'
                          },
                          { 
                            grade: '골드', 
                            condition: '실버 크레딧 10개 OR 5,000,000 ANDMAKE', 
                            vote: '5x', 
                            proposal: '✅', 
                            benefit: 'DAO 핵심 의사결정 참여',
                            color: 'yellow'
                          },
                          { 
                            grade: '플래티넘', 
                            condition: '골드 크레딧 5개 OR 커뮤니티 기여도', 
                            vote: '10x', 
                            proposal: '✅', 
                            benefit: '정책 우선 검토권',
                            color: 'purple'
                          }
                        ].map(({ grade, condition, vote, proposal, benefit, color }) => (
                          <tr key={grade} className="hover:bg-gray-50">
                            <td className={`border border-gray-300 px-4 py-2 font-medium text-${color}-700`}>
                              {grade}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{condition}</td>
                            <td className="border border-gray-300 px-4 py-2">{vote}</td>
                            <td className="border border-gray-300 px-4 py-2">{proposal}</td>
                            <td className="border border-gray-300 px-4 py-2">{benefit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-4">거버넌스 프로세스</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        1
                      </div>
                      <h5 className="font-bold mb-2">정책 제안</h5>
                      <p className="text-sm text-gray-600">커뮤니티 토론 및 수정</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        2
                      </div>
                      <h5 className="font-bold mb-2">투표 진행</h5>
                      <p className="text-sm text-gray-600">7일간 가중 투표</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg text-center">
                      <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        3
                      </div>
                      <h5 className="font-bold mb-2">정책 실행</h5>
                      <p className="text-sm text-gray-600">자동/수동 실행</p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* 챌린지 생태계 섹션 */}
            <section id="challenges" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="챌린지 생태계" 
                  subtitle="다양한 기후행동을 위한 체계적 접근" 
                />
                
                <div className="space-y-8">
                  {/* 개인 실천 챌린지 */}
                  <div>
                    <button
                      className="w-full flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-200"
                      onClick={() => toggleSection('personal-challenges')}
                    >
                      <h4 className="font-bold text-lg text-green-700">개인 실천 챌린지</h4>
                      {expandedSections['personal-challenges'] ? (
                        <FiChevronUp className="text-green-700" />
                      ) : (
                        <FiChevronDown className="text-green-700" />
                      )}
                    </button>
                    
                    {expandedSections['personal-challenges'] && (
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-3 py-2 text-left">카테고리</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">챌린지명</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">보상</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">검증 방식</th>
                              <th className="border border-gray-300 px-3 py-2 text-left">기간</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { category: '교통', name: '대중교통 이용', reward: '5-10/일', verification: 'GPS + 교통카드', period: '지속형' },
                              { category: '교통', name: '자전거 이용', reward: '8-15/일', verification: '운동 앱 연동', period: '지속형' },
                              { category: '식단', name: '채식 식단', reward: '3-8/식사', verification: '사진 + 커뮤니티 검증', period: '지속형' },
                              { category: '에너지', name: '전력 절약', reward: '10-20/월', verification: '전력사용량 API', period: '월간형' },
                              { category: '폐기물', name: '제로웨이스트', reward: '15-30/주', verification: '사진 인증', period: '주간형' }
                            ].map((challenge, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-3 py-2 font-medium">{challenge.category}</td>
                                <td className="border border-gray-300 px-3 py-2">{challenge.name}</td>
                                <td className="border border-gray-300 px-3 py-2 text-green-600 font-medium">{challenge.reward}</td>
                                <td className="border border-gray-300 px-3 py-2">{challenge.verification}</td>
                                <td className="border border-gray-300 px-3 py-2">{challenge.period}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* 협력 기반 챌린지 */}
                  <div>
                    <button
                      className="w-full flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200"
                      onClick={() => toggleSection('collaborative-challenges')}
                    >
                      <h4 className="font-bold text-lg text-blue-700">협력 기반 챌린지</h4>
                      {expandedSections['collaborative-challenges'] ? (
                        <FiChevronUp className="text-blue-700" />
                      ) : (
                        <FiChevronDown className="text-blue-700" />
                      )}
                    </button>
                    
                    {expandedSections['collaborative-challenges'] && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {
                            title: '이끼 증식 챌린지',
                            goal: '도시 내 탄소 흡수원 확대',
                            rewards: [
                              '모판 증식: 10 ANDMAKE/판',
                              '모판 양도: 20 ANDMAKE',
                              '100판 달성: 실버 크레딧',
                              '실버 크레딧 10개: 골드 크레딧'
                            ],
                            color: 'green'
                          },
                          {
                            title: '도시농업 챌린지',
                            goal: '도시 내 식량 자급률 향상',
                            rewards: [
                              '베란다 텃밭: 20-30 ANDMAKE/월',
                              '공동체 정원: 30-50 ANDMAKE/월',
                              '수확량 기록: 추가 보상',
                              '이웃 나눔: 10 ANDMAKE/회'
                            ],
                            color: 'yellow'
                          },
                          {
                            title: '나무 심기 챌린지',
                            goal: '장기적 탄소 흡수원 조성',
                            rewards: [
                              '나무 심기: 100-200 ANDMAKE/그루',
                              '관리 활동: 20 ANDMAKE/월',
                              '성장 기록: 30 ANDMAKE/분기',
                              '커뮤니티 행사: 50 ANDMAKE'
                            ],
                            color: 'green'
                          }
                        ].map(({ title, goal, rewards, color }) => (
                          <div key={title} className={`bg-${color}-50 border border-${color}-200 p-4 rounded-lg`}>
                            <h5 className={`font-bold mb-2 text-${color}-700`}>{title}</h5>
                            <p className={`text-${color}-600 text-sm mb-3`}>{goal}</p>
                            <ul className="space-y-1">
                              {rewards.map((reward, idx) => (
                                <li key={idx} className={`text-${color}-700 text-sm`}>
                                  • {reward}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 창작 및 교육 챌린지 */}
                  <div>
                    <button
                      className="w-full flex items-center justify-between bg-purple-50 p-4 rounded-lg border border-purple-200"
                      onClick={() => toggleSection('creative-challenges')}
                    >
                      <h4 className="font-bold text-lg text-purple-700">창작 및 교육 챌린지</h4>
                      {expandedSections['creative-challenges'] ? (
                        <FiChevronUp className="text-purple-700" />
                      ) : (
                        <FiChevronDown className="text-purple-700" />
                      )}
                    </button>
                    
                    {expandedSections['creative-challenges'] && (
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
                          <h5 className="font-bold text-lg mb-3 text-purple-700">그림동화 챌린지</h5>
                          <p className="text-purple-600 mb-4">기후위기 극복을 위한 어른 그림동화 제작</p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>스토리 제안:</span>
                              <span className="font-medium text-purple-700">50-100 ANDMAKE</span>
                            </div>
                            <div className="flex justify-between">
                              <span>일러스트 제작:</span>
                              <span className="font-medium text-purple-700">30-80 ANDMAKE</span>
                            </div>
                            <div className="flex justify-between">
                              <span>편집 및 구성:</span>
                              <span className="font-medium text-purple-700">40-90 ANDMAKE</span>
                            </div>
                            <div className="mt-3 p-2 bg-purple-100 rounded">
                              <span className="text-sm text-purple-700">
                                ✨ 특별 보상: 완성된 동화 출판 시 로열티 분배
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
                          <h5 className="font-bold text-lg mb-3 text-indigo-700">교육 콘텐츠 챌린지</h5>
                          <p className="text-indigo-600 mb-4">환경 교육 자료 제작 및 배포</p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>인포그래픽:</span>
                              <span className="font-medium text-indigo-700">30-60 ANDMAKE</span>
                            </div>
                            <div className="flex justify-between">
                              <span>교육 영상:</span>
                              <span className="font-medium text-indigo-700">100-300 ANDMAKE</span>
                            </div>
                            <div className="flex justify-between">
                              <span>인터랙티브 콘텐츠:</span>
                              <span className="font-medium text-indigo-700">200-500 ANDMAKE</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 검증 시스템 */}
                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-4">3단계 검증 시스템</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h5 className="font-bold mb-2 text-blue-700">1. 자동 검증</h5>
                      <ul className="text-sm space-y-1">
                        <li>• API 연동 데이터 수집</li>
                        <li>• 실시간 모니터링</li>
                        <li>• 객관적 데이터 기반</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h5 className="font-bold mb-2 text-green-700">2. 커뮤니티 검증</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 동료 평가 시스템</li>
                        <li>• 3명 이상 검증자 승인</li>
                        <li>• 검증자 토큰 보상</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h5 className="font-bold mb-2 text-purple-700">3. 전문가 검증</h5>
                      <ul className="text-sm space-y-1">
                        <li>• 환경 전문가 패널</li>
                        <li>• 과학적 데이터 기반</li>
                        <li>• 대규모 프로젝트 검증</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* 로드맵 섹션 */}
            <section id="roadmap" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="로드맵" 
                  subtitle="AndMake DAO의 단계적 발전 계획" 
                />
                
                <div className="relative">
                  {/* 타임라인 */}
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-green-600 to-brand-blue-600"></div>
                  
                  <div className="space-y-8">
                    {[
                      {
                        phase: 'Phase 1',
                        title: 'MVP 출시 및 기본 기능 구현',
                        period: '2025 Q2',
                        milestones: [
                          '웹 플랫폼 베타 버전 출시',
                          '기본 챌린지 시스템 구현',
                          'Solana 지갑 연동',
                          'ANDMAKE 토큰 발행',
                          '초기 사용자 1,000명 확보'
                        ],
                        color: 'green'
                      },
                      {
                        phase: 'Phase 2',
                        title: '커뮤니티 구축 및 거버넌스 활성화',
                        period: '2025 Q3',
                        milestones: [
                          'DAO 거버넌스 시스템 구현',
                          '이끼 증식 챌린지 정식 출시',
                          '모바일 앱 개발 시작',
                          '파트너십 체결 (5개 기업)',
                          '사용자 10,000명 달성'
                        ],
                        color: 'blue'
                      },
                      {
                        phase: 'Phase 3',
                        title: '생태계 확장 및 글로벌 진출',
                        period: '2025 Q4',
                        milestones: [
                          '모바일 앱 정식 출시',
                          '그림동화 챌린지 출시',
                          '다국어 지원 (영어, 일본어)',
                          '탄소 크레딧 거래 시스템',
                          '사용자 50,000명 달성'
                        ],
                        color: 'purple'
                      },
                      {
                        phase: 'Phase 4',
                        title: '지속가능한 성장 및 사회적 영향',
                        period: '2026 Q1-Q2',
                        milestones: [
                          'AI 기반 개인화 추천 시스템',
                          '기업용 ESG 솔루션 출시',
                          '정부 기관과의 협력 확대',
                          '국제 환경 단체와 파트너십',
                          '사용자 100,000명 달성'
                        ],
                        color: 'orange'
                      }
                    ].map(({ phase, title, period, milestones, color }, index) => (
                      <div key={index} className="relative pl-12">
                        <div className={`absolute left-0 w-8 h-8 bg-${color}-600 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                          {index + 1}
                        </div>
                        
                        <div className={`bg-${color}-50 border border-${color}-200 p-6 rounded-lg`}>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <div>
                              <h4 className={`font-bold text-lg text-${color}-700`}>{phase}</h4>
                              <h5 className={`text-${color}-600`}>{title}</h5>
                            </div>
                            <div className={`bg-${color}-100 px-3 py-1 rounded-full text-${color}-700 font-medium text-sm mt-2 md:mt-0`}>
                              {period}
                            </div>
                          </div>
                          
                          <ul className="space-y-2">
                            {milestones.map((milestone, idx) => (
                              <li key={idx} className={`flex items-start text-${color}-700`}>
                                <span className={`text-${color}-500 mr-2 mt-1`}>•</span>
                                {milestone}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            {/* 팀 소개 섹션 */}
            <section id="team" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="팀 소개" 
                  subtitle="기후위기 극복을 위해 모인 전문가들" 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: '김환경',
                      role: 'CEO & Co-founder',
                      expertise: '환경 정책, 지속가능성',
                      background: '전 환경부 기후변화정책관',
                      image: '/api/placeholder/150/150'
                    },
                    {
                      name: '이블록',
                      role: 'CTO & Co-founder', 
                      expertise: '블록체인, 스마트 컨트랙트',
                      background: '전 솔라나 랩스 개발자',
                      image: '/api/placeholder/150/150'
                    },
                    {
                      name: '박커뮤',
                      role: 'Community Manager',
                      expertise: 'DAO 거버넌스, 커뮤니티',
                      background: '전 MakerDAO 커뮤니티 매니저',
                      image: '/api/placeholder/150/150'
                    },
                    {
                      name: '최디자',
                      role: 'Lead Designer',
                      expertise: 'UX/UI 디자인, 브랜딩',
                      background: '전 카카오 프로덕트 디자이너',
                      image: '/api/placeholder/150/150'
                    },
                    {
                      name: '정데이터',
                      role: 'Data Scientist',
                      expertise: '환경 데이터, AI/ML',
                      background: '전 구글 환경 AI 팀',
                      image: '/api/placeholder/150/150'
                    },
                    {
                      name: '강마케팅',
                      role: 'Growth Manager',
                      expertise: '디지털 마케팅, 성장 전략',
                      background: '전 네이버 그로스 해킹팀',
                      image: '/api/placeholder/150/150'
                    }
                  ].map(({ name, role, expertise, background, image }) => (
                    <div key={name} className="bg-white border border-gray-200 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
                      <img 
                        src={image} 
                        alt={name}
                        className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h4 className="font-bold text-lg mb-1">{name}</h4>
                      <p className="text-brand-green-600 font-medium mb-2">{role}</p>
                      <p className="text-gray-600 text-sm mb-2">{expertise}</p>
                      <p className="text-gray-500 text-xs">{background}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-4">자문단</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        name: '조환경박사',
                        role: '환경 정책 자문',
                        background: '서울대 환경대학원 교수, IPCC 보고서 저자'
                      },
                      {
                        name: '김블록체인',
                        role: '기술 자문',
                        background: '전 이더리움 재단 개발자, DeFi 프로토콜 창시자'
                      },
                      {
                        name: '이경제학',
                        role: '토큰 이코노미 자문',
                        background: '하버드 경제학과 교수, 암호화폐 정책 전문가'
                      },
                      {
                        name: '박법무팀',
                        role: '법률 자문',
                        background: '김앤장 변호사, 블록체인 규제 전문가'
                      }
                    ].map(({ name, role, background }) => (
                      <div key={name} className="bg-white p-4 rounded-lg border border-gray-200">
                        <h5 className="font-bold mb-1">{name}</h5>
                        <p className="text-brand-green-600 text-sm mb-1">{role}</p>
                        <p className="text-gray-600 text-xs">{background}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            {/* 리스크 및 면책조항 섹션 */}
            <section id="risks" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="리스크 및 면책조항" 
                  subtitle="투자 및 참여 시 주의사항" 
                />
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-8">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-lg font-medium text-yellow-800">투자 위험 고지</h4>
                      <p className="mt-2 text-yellow-700">
                        ANDMAKE 토큰 및 AndMake DAO 참여는 높은 위험을 수반할 수 있습니다. 
                        투자 결정 전 반드시 모든 위험 요소를 신중히 검토하시기 바랍니다.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-red-700">주요 리스크</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <div>
                          <strong>기술적 리스크:</strong> 블록체인 기술의 불안정성, 스마트 컨트랙트 버그, 해킹 위험
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <div>
                          <strong>시장 리스크:</strong> 암호화폐 시장의 높은 변동성, 토큰 가격 하락 위험
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <div>
                          <strong>규제 리스크:</strong> 정부 규제 변화, 법적 불확실성
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <div>
                          <strong>운영 리스크:</strong> 팀 운영 실패, 프로젝트 중단 가능성
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <div>
                          <strong>유동성 리스크:</strong> 토큰 거래 유동성 부족, 환금성 제한
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-lg mb-4 text-gray-700">면책조항</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <div>
                          본 백서는 정보 제공 목적으로만 작성되었으며, 투자 권유나 조언이 아닙니다.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <div>
                          투자자는 본인의 책임 하에 충분한 검토 후 투자 결정을 내려야 합니다.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <div>
                          프로젝트 팀은 토큰 가격 하락이나 투자 손실에 대해 책임지지 않습니다.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <div>
                          백서 내용은 개발 진행에 따라 변경될 수 있습니다.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-gray-500 mr-2">•</span>
                        <div>
                          특정 지역에서는 토큰 구매나 사용이 제한될 수 있습니다.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-lg mb-4">투자 전 확인사항</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" disabled />
                        <span className="text-sm">프로젝트의 기술적 위험을 이해했습니다</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" disabled />
                        <span className="text-sm">암호화폐 시장의 변동성을 이해했습니다</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" disabled />
                        <span className="text-sm">투자 손실 위험을 감수할 수 있습니다</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" disabled />
                        <span className="text-sm">규제 변화에 따른 영향을 이해했습니다</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" disabled />
                        <span className="text-sm">프로젝트 로드맵이 변경될 수 있음을 인지했습니다</span>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" className="mr-2" disabled />
                        <span className="text-sm">충분한 실사를 진행했습니다</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* 연락처 및 추가 정보 섹션 */}
            <section id="contact" className="scroll-mt-8">
              <Card className="p-8">
                <SectionHeading 
                  title="연락처 및 추가 정보" 
                  subtitle="AndMake DAO와 소통하고 참여하세요" 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <FiGlobe className="mr-3 h-6 w-6 text-green-600" />
                      <h4 className="font-bold text-green-700">공식 웹사이트</h4>
                    </div>
                    <p className="text-green-600 mb-2">https://andmake-dao.org</p>
                    <p className="text-sm text-green-700">최신 소식과 플랫폼 접속</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <FiUsers className="mr-3 h-6 w-6 text-blue-600" />
                      <h4 className="font-bold text-blue-700">커뮤니티</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-blue-600 text-sm">Discord: discord.gg/andmake-dao</p>
                      <p className="text-blue-600 text-sm">Telegram: t.me/andmake_dao</p>
                      <p className="text-blue-600 text-sm">Twitter: @andmake_dao</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <FiBook className="mr-3 h-6 w-6 text-purple-600" />
                      <h4 className="font-bold text-purple-700">개발자 리소스</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-purple-600 text-sm">GitHub: github.com/andmake-dao</p>
                      <p className="text-purple-600 text-sm">문서: docs.andmake-dao.org</p>
                      <p className="text-purple-600 text-sm">API: api.andmake-dao.org</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg">
                  <div className="text-center">
                    <h4 className="font-bold text-xl mb-4">기후위기 극복을 위한 여정에 함께하세요</h4>
                    <p className="mb-6">
                      AndMake DAO는 개인의 작은 실천이 모여 거대한 변화를 만들어내는 플랫폼입니다. 
                      지속가능한 미래를 위해 우리와 함께 행동해보세요.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button 
                        variant="secondary" 
                        size="lg" 
                        className="bg-white text-green-600 hover:bg-gray-100"
                        onClick={() => router.push('/challenges')}
                      >
                        챌린지 시작하기
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-white text-white hover:bg-white hover:text-green-600"
                        onClick={() => router.push('/ico')}
                      >
                        ICO 참여하기
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 백서 버전 정보 */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <div>
                      <p>AndMake DAO 백서 v1.0</p>
                      <p>최종 업데이트: 2025년 5월 22일</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p>© 2025 AndMake DAO. All rights reserved.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </div>

        {/* 하단 고정 액션 바 (모바일) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40">
          <div className="flex space-x-2">
            <Button 
              variant="primary" 
              fullWidth 
              className="flex items-center justify-center"
              onClick={downloadWhitepaper}
            >
              <FiDownload className="mr-2" />
              PDF 다운로드
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center px-4"
              onClick={shareWhitepaper}
            >
              <FiShare2 />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}