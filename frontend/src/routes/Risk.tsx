import { useNavigate  } from "react-router-dom";
import { RiskGauge } from "@/components/RiskGauge";
import { RiskSparkline } from "@/components/RiskSparkline";
import { NearbyLoungeButton } from "@/components/NearbyLoungeButton";
import { useRisk } from '@/hooks/useRisk';
import { Button } from '@/components/ui/button';

export default function Risk() {
  const navigate = useNavigate();
  const { data, isLoading } = useRisk();
 
  if (isLoading) return <div>로딩 중...</div>;
  if (!data) return <div>데이터 없음</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">운행 위험도</h1>
 
      <RiskGauge score={data.score} level={data.level} />
 
      <div className="mt-8">
        <h2 className="text-sm text-gray-500 mb-2">최근 30분 추이</h2>
        <RiskSparkline data={data.history} />
      </div>
 
      <NearbyLoungeButton distance={12}/>
      <Button size="lg" className="w-full bg-orange-500"
          onClick={() => navigate('/')}>
          ⚡ 기본 화면으로
      </Button>
    </div>
  );

}