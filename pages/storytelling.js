import { useState } from 'react';
import SectionHeading from '../components/ui/SectionHeading';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useWallet } from '@solana/wallet-adapter-react';
import { FiBook, FiImage, FiDollarSign, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function StorytellingChallengePage() {
  const { connected } = useWallet();
  const [activeTab, setActiveTab] = useState('ongoing');
  const [storyInput, setStoryInput] = useState('');
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  
  const handleSubmitStory = () => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    if (!storyInput.trim()) {
      toast.error('스토리 내용을 입력해주세요.');
      return;
    }
    
    // 스토리 제출 로직
    toast.success('스토리가 성공적으로 제출되었습니다!');
    setStoryInput('');
    setShowSubmitForm(false);
  };
  
  const handleSubmitImage = () => {
    if (!connected) {
      toast.error('지갑을 연결해주세요.');
      return;
    }
    
    // 이미지 업로드 로직
    toast.success('이미지가 성공적으로 업로드되었습니다!');
  };
  
  const tabButtonClasses = (isActive) => 
    `px-4 py-2 text-sm font-medium ${isActive 
      ? 'bg-dark-green text-white rounded-t-md' 
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-t-md'}`;
  
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionHeading 
        title="기후위기 극복을 위한 어른 그림 동화 챌린지" 
        subtitle="스토리와 그림을 제안하고 기후위기 극복을 위한 그림동화를 함께 만들어 보세요. 완성된 동화는 출판되어 로얄티를 받을 수 있습니다."
      />
      
      <div className="flex border-b border-gray-200 mb-6">
        <button 
          className={tabButtonClasses(activeTab === 'ongoing')}
          onClick={() => setActiveTab('ongoing')}
        >
          진행중인 동화
        </button>
        <button 
          className={tabButtonClasses(activeTab === 'completed')}
          onClick={() => setActiveTab('completed')}
        >
          완성된 동화
        </button>
        <button 
          className={tabButtonClasses(activeTab === 'mywork')}
          onClick={() => setActiveTab('mywork')}
        >
          내 기여 작품
        </button>
      </div>
      
      {activeTab === 'ongoing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">자연과 함께하는 마을 이야기</h3>
                <p className="text-gray-600 text-sm mt-1">진행률: 60% (3/5 챕터 완성)</p>
              </div>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                진행중
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">기후변화로 인해 위기에 처한 작은 마을과 그곳 주민들이 자연과 공존하는 방법을 찾아가는 이야기입니다. 새로운 챕터를 기여해주세요.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2 text-sm">1장. 변화의 시작</h4>
                <p className="text-xs text-gray-600">작성자: 0x1a2b...3c4d</p>
                <div className="text-right mt-2">
                  <Button variant="outline" size="sm">보기</Button>
                </div>
              </Card>
              
              <Card className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2 text-sm">2장. 마을의 결심</h4>
                <p className="text-xs text-gray-600">작성자: 0x5e6f...7g8h</p>
                <div className="text-right mt-2">
                  <Button variant="outline" size="sm">보기</Button>
                </div>
              </Card>
              
              <Card className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2 text-sm">3장. 실천하는 주민들</h4>
                <p className="text-xs text-gray-600">작성자: 0x9i0j...1k2l</p>
                <div className="text-right mt-2">
                  <Button variant="outline" size="sm">보기</Button>
                </div>
              </Card>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <Button
                variant="primary"
                className="flex items-center"
                onClick={() => setShowSubmitForm(true)}
              >
                <FiBook className="mr-2" />
                스토리 제안
              </Button>
              <Button
                variant="secondary"
                className="flex items-center"
                onClick={handleSubmitImage}
              >
                <FiImage className="mr-2" />
                그림 업로드
              </Button>
            </div>
          </div>
          
          {showSubmitForm && (
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">새로운 챕터 스토리 제안</h3>
              <div className="mb-4">
                <label htmlFor="story" className="block text-gray-700 font-medium mb-2">
                  스토리 내용
                </label>
                <textarea
                  id="story"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green-600"
                  rows="6"
                  placeholder="자연과 함께하는 마을 이야기의 다음 챕터에 대한 스토리를 작성해주세요..."
                  value={storyInput}
                  onChange={(e) => setStoryInput(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowSubmitForm(false)}
                >
                  취소
                </Button>
                <Button
                  variant="primary"
                  className="flex items-center"
                  onClick={handleSubmitStory}
                >
                  <FiSend className="mr-2" />
                  제출하기
                </Button>
              </div>
            </Card>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">숲의 속삭임</h3>
                <p className="text-gray-600 text-sm mt-1">진행률: 20% (1/5 챕터 완성)</p>
              </div>
              <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                진행중
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">나무들이 인간에게 전하는 메시지를 담은 판타지 동화입니다. 환경 보호의 중요성을 상상력 넘치는 이야기로 풀어냅니다.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card className="p-4 bg-gray-50">
                <h4 className="font-bold mb-2 text-sm">1장. 숲의 목소리</h4>
                <p className="text-xs text-gray-600">작성자: 0x3d4e...5f6g</p>
                <div className="text-right mt-2">
                  <Button variant="outline" size="sm">보기</Button>
                </div>
              </Card>
              
              <Card className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center">
                <p className="text-gray-500 text-sm">다음 챕터 기여하기</p>
              </Card>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-end">
              <Button
                variant="primary"
                className="flex items-center"
              >
                <FiBook className="mr-2" />
                스토리 제안
              </Button>
              <Button
                variant="secondary"
                className="flex items-center"
              >
                <FiImage className="mr-2" />
                그림 업로드
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'completed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 card-hover">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">플라스틱 없는 바다</h3>
              <div className="flex items-center text-green-600">
                <FiDollarSign className="mr-1" />
                <span className="text-sm font-medium">판매중</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">플라스틱 오염으로 고통받는 바다 생물들과 이를 해결하기 위해 노력하는 어린이들의 이야기입니다.</p>
            
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                참여자: 8명
              </div>
              <div>
                총 로얄티: 1,200 ANDMAKE
              </div>
            </div>
          </Card>
          
          <Card className="p-6 card-hover">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">1도의 변화</h3>
              <div className="flex items-center text-green-600">
                <FiDollarSign className="mr-1" />
                <span className="text-sm font-medium">판매중</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">지구 온도가 1도 상승함에 따라 일어나는 다양한 환경 변화와 이를 대처하는 인류의 노력을 담은 이야기입니다.</p>
            
            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>
                참여자: 12명
              </div>
              <div>
                총 로얄티: 2,500 ANDMAKE
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {activeTab === 'mywork' && (
        <div className="space-y-6">
          {!connected ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    작품 정보를 확인하려면 지갑을 연결해주세요.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">자연과 함께하는 마을 이야기</h3>
                    <p className="text-sm text-gray-600 mt-1">2장. 마을의 결심 (스토리 제안)</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    채택됨
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">마을 주민들이 모여 기후 변화에 대응하기 위한 결심을 하는 내용을 제안했습니다.</p>
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div>
                    제출일: 2025-04-10
                  </div>
                  <div>
                    받은 보상: 50 ANDMAKE
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">숲의 속삭임</h3>
                    <p className="text-sm text-gray-600 mt-1">2장. 나무의 기억 (스토리 제안)</p>
                  </div>
                  <div className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                    검토중
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">오래된 나무가 간직한 지구의 과거 기억에 대한 이야기를 제안했습니다.</p>
                
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div>
                    제출일: 2025-05-05
                  </div>
                  <div>
                    -
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      )}
      
      <div className="bg-dark-green rounded-lg shadow-md p-6 mt-8 text-white">
        <h3 className="text-xl font-bold mb-4">챌린지 참여 방법</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-center">
              <FiBook className="h-10 w-10" />
            </div>
            <h4 className="text-center font-bold">1. 스토리 제안</h4>
            <p className="text-sm text-center">기후위기 극복을 위한 창의적인 스토리를 제안합니다. 진행 중인 동화의 다음 챕터를 작성하거나 새로운 동화를 시작할 수 있습니다.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-center">
              <FiImage className="h-10 w-10" />
            </div>
            <h4 className="text-center font-bold">2. 그림 업로드</h4>
            <p className="text-sm text-center">스토리에 맞는 일러스트를 제작하여 업로드합니다. 기후위기 메시지를 시각적으로 전달하는 이미지를 만들어보세요.</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-center">
              <FiDollarSign className="h-10 w-10" />
            </div>
            <h4 className="text-center font-bold">3. 보상 획득</h4>
            <p className="text-sm text-center">제안이 채택되면 ANDMAKE 토큰을 보상으로 받고, 완성된 동화가 출판되면 로얄티를 받을 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}