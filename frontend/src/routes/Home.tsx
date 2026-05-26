import { useEffect, useState  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbping } from "@/api/lounges";
import { useTripStore } from '@/stores/trip';
import { RunningHomeView } from "@/components/RunningHomeView";
import { IdleHomeView } from "@/components/IdleHomeView";
import TripSummary from "@/components/TripSummary";
import { UnjigiCallButton } from "@/components/voice/UnjigiCallButton";
import { BottomTabBar } from "@/components/layout/BottomTabBar";
import { TabScreen } from "@/components/layout/TabScreen";
import "./Home.css";

export default function Home() {
  const [summaryOpen, setSummaryOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isRunning = useTripStore(s => s.isRunning);
  const endTrip = useTripStore(s => s.endTrip);

  useEffect(() => {
    dbping();
  }, []);

  useEffect(() => {
    if (location.state?.showTripSummary) {
      setSummaryOpen(true);

      navigate("/", {
        replace: true,
        state: null,
      });
    }
  }, [location.state, navigate]);

  const handleTripSummaryClose = () => {
    setSummaryOpen(false);
    endTrip();
  };

  return (
    <>
      <TabScreen>
        {isRunning ? <RunningHomeView /> : <IdleHomeView />}
        <UnjigiCallButton />
        <TripSummary
          open={summaryOpen}
          onClose={handleTripSummaryClose}
        />
      </TabScreen>
      <BottomTabBar />
    </>
  );
}
