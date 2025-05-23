import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function CarbonEmissionChart({ communitySavings, title, data }) {
  const [chartData, setChartData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  // 반응형 처리를 위한 윈도우 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // 데이터 설정
  useEffect(() => {
    if (data) {
      setChartData(data);
    } else {
      // 예시 데이터 생성
      const months = windowWidth < 768 ? 
        ['1월', '2월', '3월', '4월', '5월', '6월'] :
        ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
      
      const mockData = months.map((month, index) => {
        // 커뮤니티 저감량은 점점 증가하는 추세
       const communityReduction = communitySavings ? 
         Math.round((index + 1) * 25 * (1 + Math.random() * 0.5)) : 0;
       
       return {
         name: month,
         '평균 탄소 배출량': 500 - Math.round(index * 5 * (0.8 + Math.random() * 0.4)),
         '커뮤니티 저감량': communityReduction,
       };
     });
     
     setChartData(mockData);
   }
 }, [communitySavings, windowWidth, data]);
 
 return (
   <div className="bg-white rounded-lg shadow-md p-4">
     <h3 className="text-xl font-bold mb-4">{title || '월별 탄소 배출량 변화'}</h3>
     <div className="h-[300px] w-full">
       <ResponsiveContainer width="100%" height="100%">
         <LineChart
           data={chartData}
           margin={{
             top: 5,
             right: 20,
             left: windowWidth < 768 ? 0 : 20,
             bottom: 5,
           }}
         >
           <CartesianGrid strokeDasharray="3 3" />
           <XAxis dataKey="name" tick={{ fontSize: windowWidth < 768 ? 10 : 12 }} />
           <YAxis width={windowWidth < 768 ? 30 : 40} tick={{ fontSize: windowWidth < 768 ? 10 : 12 }} />
           <Tooltip 
             contentStyle={{ fontSize: windowWidth < 768 ? 12 : 14 }}
             itemStyle={{ padding: windowWidth < 768 ? '2px 0' : '4px 0' }}
           />
           <Legend wrapperStyle={{ fontSize: windowWidth < 768 ? 10 : 12 }} />
           <Line
             type="monotone"
             dataKey="평균 탄소 배출량"
             stroke="#ef4444"
             activeDot={{ r: 8 }}
             strokeWidth={2}
           />
           {communitySavings && (
             <Line 
               type="monotone" 
               dataKey="커뮤니티 저감량" 
               stroke="#22c55e" 
               strokeWidth={2}
             />
           )}
         </LineChart>
       </ResponsiveContainer>
     </div>
   </div>
 );
}