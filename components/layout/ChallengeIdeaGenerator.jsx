import React, { useEffect, useState, useCallback } from 'react';

// --- Gemini API를 사용하는 챌린지 아이디어 생성기 컴포넌트 ---
const ChallengeIdeaGenerator = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateIdeas = async () => {
    if (!topic.trim()) {
      setError("아이디어를 생성할 주제를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setIdeas([]); // 이전 아이디어 초기화

    try {
      // Gemini API 호출을 위한 프롬프트 구성
      const prompt = `다음 주제와 관련된 창의적이고 실천 가능한 환경 보호 챌린지 아이디어 3가지를 한국어로 제안해주세요. 각 아이디어는 제목과 간단한 설명을 포함해야 합니다. 주제: "${topic}"`;
      
      let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiKey = ""; // API 키는 Canvas 환경에서 자동으로 처리됩니다.
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API call failed:", errorData);
        throw new Error(`Gemini API 호출에 실패했습니다 (상태 코드: ${response.status}).`);
      }

      const result = await response.json();

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const rawText = result.candidates[0].content.parts[0].text;
        // API 응답 텍스트를 파싱하여 아이디어 목록으로 변환 (응답 형식에 따라 조정 필요)
        // 예시: 각 아이디어가 "제목: [제목]\n설명: [설명]" 형식으로 온다고 가정
        const parsedIdeas = rawText.split(/\n\s*\n/).map((ideaBlock, index) => {
          const titleMatch = ideaBlock.match(/제목:\s*(.*)/);
          const descriptionMatch = ideaBlock.match(/설명:\s*(.*)/);
          return {
            id: index,
            title: titleMatch ? titleMatch[1] : `아이디어 ${index + 1}`,
            description: descriptionMatch ? descriptionMatch[1] : ideaBlock,
          };
        });
        setIdeas(parsedIdeas);
      } else {
        console.error("Unexpected Gemini API response structure:", result);
        throw new Error("Gemini API로부터 유효한 아이디어를 받지 못했습니다.");
      }

    } catch (err) {
      console.error('Error generating challenge ideas:', err);
      setError(err.message || "챌린지 아이디어 생성 중 알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-teal-400">새로운 챌린지 아이디어 제안받기 ✨</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          어떤 환경 보호 활동을 시작해야 할지 막막하신가요? 관심 있는 주제를 입력하고 Gemini AI의 도움을 받아 창의적인 챌린지 아이디어를 얻어보세요!
        </p>
        <div className="max-w-lg mx-auto bg-gray-700 p-6 sm:p-8 rounded-xl shadow-2xl">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="예: 플라스틱 줄이기, 에너지 절약, 제로 웨이스트"
            className="w-full p-3 mb-4 bg-gray-600 text-gray-100 rounded-lg border border-gray-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none placeholder-gray-400"
          />
          <button
            onClick={handleGenerateIdeas}
            disabled={isLoading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                아이디어 생성 중...
              </>
            ) : (
              "챌린지 아이디어 생성하기 ✨"
            )}
          </button>
          {error && <p className="mt-4 text-red-400 bg-red-900 bg-opacity-50 p-3 rounded-md">{error}</p>}
        </div>

        {ideas.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 text-green-400">AI 추천 챌린지 아이디어:</h3>
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {ideas.map((idea) => (
                <div key={idea.id} className="bg-gray-700 p-6 rounded-lg shadow-xl text-left hover:shadow-2xl transition-shadow duration-300">
                  <h4 className="text-xl font-bold text-teal-300 mb-2">{idea.title}</h4>
                  <p className="text-gray-300 text-sm">{idea.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChallengeIdeaGenerator;