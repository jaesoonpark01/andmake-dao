import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import { FiDatabase, FiUsers, FiTarget, FiLayers, FiCode, FiGlobe, FiSmartphone, FiAward } from 'react-icons/fi';

export default function RoadmapPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeading 
        title="그리고만들다 DAO 발전 로드맵" 
        subtitle="지속 가능한 기후위기 대응을 위한 우리의 계획입니다."
      />
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
         <div className="md:w-1/3">
           <h3 className="text-xl font-bold mb-4 text-green-950">플랫폼 비전</h3>
           <p className="text-gray-700 mb-4">
             그리고만들다 DAO는 블록체인 기술을 활용하여 누구나 쉽게 기후위기 대응에 참여하고 
             보상받을 수 있는 탈중앙화된 커뮤니티를 구축하고자 합니다.
           </p>
           <p className="text-gray-700">
             우리의 목표는 2030년까지 전 세계적으로 100만 명 이상의 참여자와 함께 
             연간 100만 톤의 탄소 저감 효과를 달성하는 것입니다.
           </p>
         </div>
         
         <div className="md:w-2/3">
           <h3 className="text-xl font-bold mb-4 text-green-950">핵심 발전 단계</h3>
           <div className="relative">
             <div className="absolute left-4 h-full w-0.5 bg-green-200"></div>
             
             <div className="relative pl-12 pb-8">
               <div className="absolute left-0 rounded-full bg-green-600 text-white w-8 h-8 flex items-center justify-center font-bold">1</div>
               <h4 className="font-bold text-lg mb-2">초기 커뮤니티 구축 (2023 Q3 - 2024 Q1)</h4>
               <p className="text-gray-700">핵심 챌린지 개발 및 초기 사용자 확보, MVP 출시</p>
             </div>
             
             <div className="relative pl-12 pb-8">
               <div className="absolute left-0 rounded-full bg-green-600 text-white w-8 h-8 flex items-center justify-center font-bold">2</div>
               <h4 className="font-bold text-lg mb-2">DAO 거버넌스 고도화 (2024 Q2 - Q3)</h4>
               <p className="text-gray-700">분산형 거버넌스 시스템 도입 및 토큰 이코노미 확장</p>
             </div>
             
             <div className="relative pl-12 pb-8">
               <div className="absolute left-0 rounded-full bg-green-600 text-white w-8 h-8 flex items-center justify-center font-bold">3</div>
               <h4 className="font-bold text-lg mb-2">탄소 마켓플레이스 출시 (2024 Q4 - 2025 Q1)</h4>
               <p className="text-gray-700">검증된 탄소 크레딧 거래 플랫폼 구축 및 파트너십 확대</p>
             </div>
             
             <div className="relative pl-12">
               <div className="absolute left-0 rounded-full bg-green-600 text-white w-8 h-8 flex items-center justify-center font-bold">4</div>
               <h4 className="font-bold text-lg mb-2">글로벌 확장 (2025 Q2 - )</h4>
               <p className="text-gray-700">다국어 지원 및 국제 환경 단체와의 협력 강화</p>
             </div>
           </div>
         </div>
       </div>
     </div>
     
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
       <div>
         <h3 className="text-xl font-bold mb-6 text-green-950">기술적 개선점</h3>
         
         <Card className="mb-6">
           <div className="flex items-start mb-4">
             <div className="bg-green-100 rounded-lg p-3 mr-4">
               <FiLayers className="h-6 w-6 text-green-700" />
             </div>
             <div>
               <h4 className="font-bold mb-2">블록체인 확장성 확보</h4>
               <ul className="text-gray-700 text-sm space-y-2">
                 <li>• 레이어2 솔루션 도입으로 트랜잭션 처리량 증가</li>
                 <li>• 크로스 체인 브릿지를 통한 멀티체인 지원</li>
                 <li>• 가스비 최적화로 사용자 경험 향상</li>
               </ul>
             </div>
           </div>
         </Card>
         
         <Card className="mb-6">
           <div className="flex items-start mb-4">
             <div className="bg-green-100 rounded-lg p-3 mr-4">
               <FiDatabase className="h-6 w-6 text-green-700" />
             </div>
             <div>
               <h4 className="font-bold mb-2">데이터 분석 고도화</h4>
               <ul className="text-gray-700 text-sm space-y-2">
                 <li>• 머신러닝을 활용한 탄소 저감량 정밀 측정</li>
                 <li>• 빅데이터 분석으로 사용자별 맞춤형 챌린지 추천</li>
                 <li>• 예측 모델을 통한 탄소 저감 효과 시뮬레이션</li>
               </ul>
             </div>
           </div>
         </Card>
         
         <Card>
           <div className="flex items-start mb-4">
             <div className="bg-green-100 rounded-lg p-3 mr-4">
               <FiCode className="h-6 w-6 text-green-700" />
             </div>
             <div>
               <h4 className="font-bold mb-2">스마트 컨트랙트 개선</h4>
               <ul className="text-gray-700 text-sm space-y-2">
                 <li>• 오라클 서비스 연동으로 실시간 환경 데이터 활용</li>
                 <li>• 다중 서명 기능 강화로 보안성 향상</li>
                 <li>• 자동화된 검증 시스템 구축</li>
               </ul>
             </div>
           </div>
         </Card>
       </div>
       
       <div>
         <h3 className="text-xl font-bold mb-6 text-green-950">비즈니스 모델 확장</h3>
         
         <Card className="mb-6">
           <div className="flex items-start mb-4">
             <div className="bg-green-100 rounded-lg p-3 mr-4">
               <FiTarget className="h-6 w-6 text-green-700" />
             </div>
             <div>
               <h4 className="font-bold mb-2">탄소 크레딧 마켓플레이스</h4>
               <ul className="text-gray-700 text-sm space-y-2">
                 <li>• 검증된 탄소 크레딧 거래 플랫폼 구축</li>
                 <li>• 기업과 개인 간 직접 탄소 상쇄 거래 지원</li>
                 <li>• 블록체인 기반 탄소 크레딧 추적 시스템</li>
               </ul>
             </div>
           </div>
         </Card>
         
         <Card className="mb-6">
           <div className="flex items-start mb-4">
             <div className="bg-green-100 rounded-lg p-3 mr-4">
               <FiGlobe className="h-6 w-6 text-green-700" />
             </div>
             <div>
               <h4 className="font-bold mb-2">지역 기반 마이크로 DAO</h4>
               <ul className="text-gray-700 text-sm space-y-2">
                 <li>• 지역별 특성에 맞는 하위 DAO 구성</li>
                 <li>• 지역 문제 해결을 위한 분권화된 의사결정 구조</li>
                 <li>• 지역 기반 환경 프로젝트 직접 지원</li>
               </ul>
             </div>
           </div>
         </Card>
         
         <Card>
           <div className="flex items-start mb-4">
             <div className="bg-green-100 rounded-lg p-3 mr-4">
               <FiUsers className="h-6 w-6 text-green-700" />
             </div>
             <div>
               <h4 className="font-bold mb-2">친환경 브랜드 인큐베이팅</h4>
               <ul className="text-gray-700 text-sm space-y-2">
                 <li>• DAO 자금을 활용한 친환경 스타트업 지원</li>
                 <li>• 회원 주도 제품 개발 및 수익 공유 모델</li>
                 <li>• 친환경 제품 개발을 위한 크라우드펀딩</li>
               </ul>
             </div>
           </div>
         </Card>
       </div>
       
       <div>
         <h3 className="text-xl font-bold mb-6 text-green-950">참여자 경험 향상</h3>
         
         <Card className="mb-6">
           <div className="flex items-start mb-4">
             <div className="bg-green-100 rounded-lg p-3 mr-4">
               <FiAward className="h-6 w-6 text-green-700" />
             </div>
             <div>
               <h4 className="font-bold mb-2">게이미피케이션 요소 강화</h4>
               <ul className="text-gray-700 text-sm space-y-2">
                 <li>• 챌린지 레벨 시스템 도입</li>
                 <li>• 디지털 뱃지 및 성취 시스템 확장</li>
                 <li>• 친환경 활동 기반 게임형 콘텐츠 개발</li>
               </ul>
             </div>
           </div>
         </Card>
         
         <Card className="mb-6">
           <div className="flex items-start mb-4">
             <div className="bg-green-100 rounded-lg p-3 mr-4">
               <FiUsers className="h-6 w-6 text-green-700" />
             </div>
             <div>
               <h4 className="font-bold mb-2">소셜 기능 확대</h4>
               <ul className="text-gray-700 text-sm space-y-2">
                 <li>• 친구 초대 및 팀 챌린지 기능</li>
                 <li>• 커뮤니티 멤버 간 지식 공유 플랫폼</li>
                 <li>• 소셜 네트워크 통합 인증 시스템</li>
               </ul>
             </div>
           </div>
         </Card>
         
         <Card>
           <div className="flex items-start mb-4">
             <div className="bg-green-100 rounded-lg p-3 mr-4">
               <FiSmartphone className="h-6 w-6 text-green-700" />
             </div>
             <div>
               <h4 className="font-bold mb-2">모바일 앱 개발</h4>
               <ul className="text-gray-700 text-sm space-y-2">
                 <li>• 위치 기반 서비스로 지역 환경 활동 참여 촉진</li>
                 <li>• 푸시 알림을 통한 실시간 참여 유도</li>
                 <li>• 오프라인 활동 인증 기능 강화</li>
               </ul>
             </div>
           </div>
         </Card>
       </div>
     </div>
     
     <div className="bg-green-950 text-white rounded-lg shadow-md p-8">
       <h3 className="text-2xl font-bold mb-6 text-center">지속 가능한 미래를 위한 우리의 약속</h3>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div>
           <h4 className="font-bold text-lg mb-4">우리의 사명</h4>
           <p className="mb-4">
             그리고만들다 DAO는 기술의 힘을 활용하여 모든 사람이 기후위기 대응에 
             참여할 수 있는 인센티브 기반 플랫폼을 구축함으로써, 
             지구 환경 보전과 지속 가능한 미래를 위한 집단적 행동을 촉진합니다.
           </p>
           <p>
             우리는 투명성, 참여, 지속 가능성의 가치를 중심으로 
             블록체인 기술을 활용하여 개인의 작은 실천이 모여 
             거대한 변화를 이끌어낸다는 것을 증명하고자 합니다.
           </p>
         </div>
         
         <div>
           <h4 className="font-bold text-lg mb-4">2030년 목표</h4>
           <ul className="space-y-4">
             <li className="flex items-start">
               <div className="bg-green-700 rounded-full p-1 text-white mr-3 mt-0.5">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
               </div>
               <p>전 세계적으로 <span className="font-bold">1억억 명 이상</span>의 활성 참여자 확보</p>
             </li>
             <li className="flex items-start">
               <div className="bg-green-700 rounded-full p-1 text-white mr-3 mt-0.5">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
               </div>
               <p>연간 <span className="font-bold">100만 톤</span>의 탄소 저감 효과 달성</p>
             </li>
             <li className="flex items-start">
               <div className="bg-green-700 rounded-full p-1 text-white mr-3 mt-0.5">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
               </div>
               <p><span className="font-bold">70개국</span> 이상에서 로컬 DAO 운영</p>
             </li>
             <li className="flex items-start">
               <div className="bg-green-700 rounded-full p-1 text-white mr-3 mt-0.5">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                 </svg>
               </div>
               <p><span className="font-bold">1000개 이상</span>의 친환경 프로젝트 직접 지원</p>
             </li>
           </ul>
         </div>
       </div>
     </div>
   </div>
 );
}
