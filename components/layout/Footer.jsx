// components/layout/Footer.jsx (백서 링크 추가된 버전)
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-950 text-gray-400 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-white">그리고만들다 DAO</h3>
            <p className="text-gray-400 text-sm mb-4">
              인간이기에 기후위기를 극복해야하는 우리들의 소소한 일상이야기
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-white">프로젝트</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link href="/whitepaper" className="hover:text-white transition-colors">백서</Link></li>
                <li><Link href="/roadmap" className="hover:text-white transition-colors">로드맵</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">팀 소개</Link></li>
                <li><Link href="/partnership" className="hover:text-white transition-colors">파트너십</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-white">커뮤니티</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link href="/governance" className="hover:text-white transition-colors">정책 제안</Link></li>
                <li><Link href="/activities" className="hover:text-white transition-colors">활동 현황</Link></li>
                <li><Link href="/forum" className="hover:text-white transition-colors">포럼</Link></li>
                <li><Link href="/events" className="hover:text-white transition-colors">이벤트</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-white">챌린지</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link href="/challenges" className="hover:text-white transition-colors">모든 챌린지</Link></li>
                <li><Link href="/moss-challenge" className="hover:text-white transition-colors">이끼 챌린지</Link></li>
                <li><Link href="/storytelling" className="hover:text-white transition-colors">그림동화 챌린지</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition-colors">리더보드</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3 text-white">토큰</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><Link href="/token-economy" className="hover:text-white transition-colors">토큰 경제</Link></li>
                <li><Link href="/ico" className="hover:text-white transition-colors">ICO 참여</Link></li>
                <li><Link href="/staking" className="hover:text-white transition-colors">스테이킹</Link></li>
                <li><Link href="/rewards" className="hover:text-white transition-colors">보상 내역</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; 2025 그리고만들다 DAO. 모든 권리 보유.</p>
              <p className="mt-1">기후위기 극복을 위한 블록체인 기반 탈중앙화 자율조직</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                이용약관
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}