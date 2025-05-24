// React 및 관련 훅 임포트
import React, { useEffect, useState, useCallback } from 'react';

// --- 임시 컴포넌트 정의 (실제 프로젝트에서는 별도 파일로 분리) ---
const Header = () => <header className="bg-gray-800 text-white p-4 text-center sticky top-0 z-50 shadow-md">AndMake DAO 임시 헤더</header>;
const Footer = () => <footer className="bg-gray-700 text-white p-4 text-center mt-auto">AndMake DAO 임시 푸터 © 2025</footer>;
const BottomNav = () => <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 text-center md:hidden z-50 border-t border-gray-700">임시 하단 네비게이션</nav>;

// --- HeroSection 컴포넌트 ---
const HeroSection = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageUrl] = useState('/images/Token Economy.png');
  const [generationError, setGenerationError] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageLoading(false);
    };
    img.onerror = () => {
      setGenerationError("이미지 로드에 실패했습니다.");
      setImageLoading(false);
    };
  }, [imageUrl]);

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center text-white bg-gradient-to-r from-green-500 via-teal-500 to-blue-600 overflow-hidden">
      {imageLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-20">
          <svg className="animate-spin h-12 w-12 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl font-semibold">대표 이미지를 생성 중입니다...</p>
        </div>
      )}
      {generationError && !imageLoading && (
         <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-800 bg-opacity-90 z-20 p-6 text-center">
          <h3 className="text-2xl font-bold mb-3">이미지 생성 오류</h3>
          <p className="mb-3">대표 이미지를 생성하는 데 실패했습니다. 기본 이미지가 표시됩니다.</p>
          <p className="text-sm text-red-200 bg-red-900 p-2 rounded">오류: {generationError}</p>
        </div>
      )}
      <img
        src={imageUrl}
        alt="AndMake DAO Hero Image"
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = 'https://placehold.co/1200x600/1A202C/A0AEC0?text=Image+Load+Error';
          if (!generationError) setGenerationError("이미지 로드에 실패했습니다. 대체 이미지가 표시됩니다.");
        }}
      />
      <div className="relative z-10 p-8 text-center bg-black bg-opacity-60 rounded-xl max-w-3xl mx-auto shadow-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight text-shadow-lg">
          함께 만들어요, 지속 가능한 미래!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8 font-light text-gray-200">
          AndMake DAO는 기후 위기 대응을 위한 작은 실천들이 모여 큰 변화를 만드는 커뮤니티입니다.
          지금 바로 참여하여 지구를 위한 행동에 함께하세요.
        </p>
        <div>
          <a
            href="/challenges"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            챌린지 참여하기
          </a>
        </div>
      </div>
    </section>
  );
};

// HeroSection 컴포넌트는 AndMake DAO의 메인 히어로 섹션을 구성합니다.

export default HeroSection;