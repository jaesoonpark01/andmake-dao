import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import { FiMenu, FiX } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// WalletMultiButton을 클라이언트 측에서만 로드하도록 설정
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then(mod => mod.WalletMultiButton),
  { ssr: false }
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connected } = useWallet();
  const [mounted, setMounted] = useState(false);

  // 클라이언트 측에서만 마운트되도록 설정
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-green-950 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-18 w-42 mr-2 relative">
              <Image 
                src="/images/logo.png" 
                alt="ANDMAKE DAO Logo" 
                width={120} 
                height={60} 
                className="mr-2"
              />
            </div>
            <Link href="/" className="text-xl font-bold cursor-pointer">
              그리고만들다 DAO
            </Link>
          </div>
          
          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="메뉴 열기/닫기"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/governance" className="hover:text-green-200 transition-colors cursor-pointer">
                  거버넌스
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="hover:text-green-200 transition-colors cursor-pointer">
                  챌린지
                </Link>
              </li>
              <li>
                <Link href="/moss-challenge" className="hover:text-green-200 transition-colors cursor-pointer">
                  이끼챌린지
                </Link>
              </li>
              <li>
                <Link href="/storytelling" className="hover:text-green-200 transition-colors cursor-pointer">
                  그림동화
                </Link>
              </li>
              <li>
                <Link href="/carbon-marketplace" className="hover:text-green-200 transition-colors cursor-pointer">
                  탄소마켓
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-green-200 transition-colors cursor-pointer">
                  데이터분석
                </Link>
              </li>
              <li>
                <Link href="/token-economy" className="hover:text-green-200 transition-colors cursor-pointer">
                  토큰
                </Link>
              </li>
              <li>
                <Link href="/ico" className="block hover:text-brand-green-200 transition-colors cursor-pointer">ICO</Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-green-200 transition-colors cursor-pointer">
                  로드맵
                </Link>
              </li>
              <li>
                {/* WalletMultiButton은 클라이언트 측에서만 렌더링 */}
                {mounted && (
                  <WalletMultiButton className="bg-white text-green-950 px-4 py-1 rounded-full font-medium hover:bg-green-100 transition-colors" />
                )}
              </li>
            </ul>
          </nav>
        </div>
        
        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 animate-fadeIn">
            <ul className="space-y-4">
              <li><Link href="/governance" className="block hover:text-green-200 transition-colors cursor-pointer">거버넌스</Link></li>
              <li><Link href="/challenges" className="block hover:text-green-200 transition-colors cursor-pointer">챌린지</Link></li>
              <li><Link href="/moss-challenge" className="block hover:text-green-200 transition-colors cursor-pointer">이끼 챌린지</Link></li>
              <li><Link href="/storytelling" className="block hover:text-green-200 transition-colors cursor-pointer">그림동화</Link></li>
              <li><Link href="/carbon-marketplace" className="block hover:text-green-200 transition-colors cursor-pointer">탄소마켓</Link></li>
              <li><Link href="/analytics" className="block hover:text-green-200 transition-colors cursor-pointer">데이터분석</Link></li>
              <li><Link href="/token-economy" className="block hover:text-green-200 transition-colors cursor-pointer">토큰</Link></li>
              <li><Link href="/ico" className="block hover:text-green-200 transition-colors cursor-pointer">ICO</Link></li>
              <li><Link href="/roadmap" className="block hover:text-green-200 transition-colors cursor-pointer">로드맵</Link></li>
              <li className="mt-2">
                {/* 모바일 메뉴에서도 클라이언트 측 렌더링 적용 */}
                {mounted && (
                  <WalletMultiButton className="bg-white text-green-950 px-4 py-1 rounded-full font-medium hover:bg-green-100 transition-colors w-full" />
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}