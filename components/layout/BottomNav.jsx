import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiBook, FiAward, FiDollarSign, FiBarChart2, FiShoppingBag, FiPieChart } from 'react-icons/fi';

export default function BottomNav() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 스크롤 방향에 따라 네비게이션 표시/숨김 처리
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`md:hidden bottom-nav transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="grid grid-cols-5 h-16">
        <Link 
          href="/" 
          className={`flex flex-col items-center justify-center ${router.pathname === '/' ? 'text-green-600' : 'text-gray-500'}`}
        >
          <FiHome className="h-6 w-6 mb-1" />
          <span className="text-xs">홈</span>
        </Link>
        
        <Link 
          href="/governance" 
          className={`flex flex-col items-center justify-center ${router.pathname === '/governance' ? 'text-green-600' : 'text-gray-500'}`}
        >
          <FiBook className="h-6 w-6 mb-1" />
          <span className="text-xs">거버넌스</span>
        </Link>
        
        <Link 
          href="/challenges" 
          className={`flex flex-col items-center justify-center ${router.pathname.includes('/challenge') ? 'text-green-600' : 'text-gray-500'}`}
        >
          <FiAward className="h-6 w-6 mb-1" />
          <span className="text-xs">챌린지</span>
        </Link>
        
        <Link 
          href="/carbon-marketplace" 
          className={`flex flex-col items-center justify-center ${router.pathname === '/carbon-marketplace' ? 'text-green-600' : 'text-gray-500'}`}
        >
          <FiShoppingBag className="h-6 w-6 mb-1" />
          <span className="text-xs">탄소마켓</span>
        </Link>
        
        <Link 
          href="/analytics" 
          className={`flex flex-col items-center justify-center ${router.pathname === '/analytics' ? 'text-green-600' : 'text-gray-500'}`}
        >
          <FiPieChart className="h-6 w-6 mb-1" />
          <span className="text-xs">분석</span>
        </Link>
      </div>
    </nav>
  );
}