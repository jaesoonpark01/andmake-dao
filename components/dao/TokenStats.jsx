import Card from '../ui/Card';

export default function TokenStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <Card className="text-center p-4">
        <div className="text-xl md:text-2xl font-bold text-brand-green-600 mb-2">{stats.price}</div>
        <div className="text-gray-600 text-sm">현재 토큰 가격</div>
      </Card>
      <Card className="text-center p-4">
        <div className="text-xl md:text-2xl font-bold text-brand-green-600 mb-2">{stats.circulatingSupply}</div>
        <div className="text-gray-600 text-sm">유통량</div>
      </Card>
      <Card className="text-center p-4">
        <div className="text-xl md:text-2xl font-bold text-brand-green-600 mb-2">{stats.holders}</div>
        <div className="text-gray-600 text-sm">토큰 보유자</div>
      </Card>
    </div>
  );
}