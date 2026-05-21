import { useNavigate  } from "react-router-dom";
import { useEffect } from "react";
import { dbping } from "@/api/lounges";
import { useTripStore } from '@/stores/trip';
import { Button } from '@/components/ui/button';

export default function Home() {
  useEffect(() => {
    dbping();
  }, []);

  const navigate = useNavigate();
  const isRunning = useTripStore(s => s.isRunning);

  if (isRunning) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="bg-orange-50 p-3 rounded-lg mb-4 text-center font-bold text-orange-700">
          🚛 운행 중
        </div>
        <Button size="lg" className="w-full bg-orange-500"
          onClick={() => navigate('/risk')}>
          ⚡ 운행 화면으로
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      {/* 인사 + 운행 시작 CTA + 빠른 정보 3개 + 음성 동반자 토글 + 하단 탭바 */}
      <Button size="lg" className="w-full h-20 bg-orange-500"
        onClick={() => navigate('/start-trip')}>
        🚛 운행 시작
      </Button>
    </div>

  );
}