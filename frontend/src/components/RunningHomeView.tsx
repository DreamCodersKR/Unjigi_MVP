import { useNavigate  } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { RunEndButton } from "@/components/RunEndButton";
import { useRisk } from '@/hooks/useRisk';
import { TabScreenBottomAction } from "@/components/layout/TabScreen";

export function RunningHomeView() {
  const navigate = useNavigate();
  const { data } = useRisk();

  return (
    <>
      <div className="rounded-lg bg-orange-50 p-5 text-center text-2xl font-bold text-orange-700">
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
      <TabScreenBottomAction>
        <RunEndButton/>
      </TabScreenBottomAction>
    </>
  );
}
