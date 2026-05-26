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
      <div className="home-running-status">
        🚛 운행 중
      </div>
      <Button
        size="lg"
        className="home-running-risk-button"
        onClick={() => navigate('/risk')}
      >
        <span className="home-running-risk-button__content">
          <span>⚡ 운행 화면으로</span>
          <span className="home-running-risk-button__meta">
            현재 위험: {data?.level} ({data?.score}점)
          </span>
        </span>
      </Button>
      <TabScreenBottomAction offset="tabbar">
        <RunEndButton/>
      </TabScreenBottomAction>
    </>
  );
}
