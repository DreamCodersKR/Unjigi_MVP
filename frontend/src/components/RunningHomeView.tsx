import { useNavigate  } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { RunEndButton } from "@/components/RunEndButton";
import { BottomTabBar } from "@/components/BottomTabBar";
import { useRisk } from '@/hooks/useRisk';

export function RunningHomeView() {
  const navigate = useNavigate();
  const { data } = useRisk();

  return (
      <div>
        <div> </div>
        <div> </div>
        <div className="
          bg-orange-50 
          p-5
          rounded-lg 
          m-10 
          text-center 
          font-bold 
          text-orange-700
          text-2xl"
        >
          🚛 운행 중
        </div>
        <Button 
          size="lg" 
          className="w-full bg-orange-500 py-9 text-xl"
          onClick={() => navigate('/risk')}
        >
          <span className="flex flex-col items-center justify-center gap-2 leading-none">
            <span>⚡ 운행 화면으로</span>
            <span className="text-sm font-medium text-orange-100">
              현재 위험: {data?.level} ({data?.score}점)
            </span>
          </span>
        </Button>
        <div className="fixed inset-x-0 bottom-24 z-40 px-4"><RunEndButton/></div>
        <BottomTabBar/>
      </div>
  );
}
