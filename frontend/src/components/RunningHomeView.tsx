import { useNavigate  } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { RunEndButton } from "@/components/RunEndButton";

export function RunningHomeView() {
  const navigate = useNavigate();

  return (
      <div>
        <div> </div>
        <div> </div>
        <div className="
          bg-orange-50 
          p-3 
          rounded-lg 
          m-10 
          text-center 
          font-bold 
          text-orange-700"
          text-lg
        >
          🚛 운행 중
        </div>
        <RunEndButton/>
        <Button size="lg" className="w-full bg-orange-500"
          onClick={() => navigate('/risk')}>
          ⚡ 운행 화면으로
        </Button>
      </div>
  );
}
