import { useState, useEffect } from 'react';
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function BarChart({ title, data }) {
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
      const regions = ['서울', '경기', '인천', '부산', '대구', '광주'];
      
      const mockData = regions.map((region) => {
        return {
          name: region,
          '참여자 수': Math.round(Math.random() * 1000) + 500,
          '탄소 저감량(kg)': Math.round(Math.random() * 50000) + 10000,
        };
      });
      
      setChartData(mockData);
    }
  }, [data]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBar
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
            <YAxis yAxisId="left" orientation="left" stroke="#22c55e" />
            <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: windowWidth < 768 ? 10 : 12 }} />
            <Bar yAxisId="left" dataKey="참여자 수" fill="#22c55e" />
            <Bar yAxisId="right" dataKey="탄소 저감량(kg)" fill="#3b82f6" />
          </RechartsBar>
        </ResponsiveContainer>
      </div>
    </div>
  );
}