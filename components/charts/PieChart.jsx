import { useState, useEffect } from 'react';
import {
  PieChart as RechartsPie,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function PieChart({ title, data }) {
  const [chartData, setChartData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  
  const COLORS = ['#22c55e', '#3b82f6', '#a855f7', '#ef4444', '#f97316', '#facc15'];
  
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
      setChartData([
        { name: '이끼 챌린지', value: 35 },
        { name: '저탄소 생활', value: 20 },
        { name: '그림동화', value: 15 },
        { name: '제로 웨이스트', value: 25 },
        { name: '기타', value: 5 }
      ]);
    }
  }, [data]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPie>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={windowWidth < 768 ? 40 : 60}
              outerRadius={windowWidth < 768 ? 80 : 100}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend wrapperStyle={{ fontSize: windowWidth < 768 ? 10 : 12 }} />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </div>
  );
}