import { useEffect, useState  } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dbping } from "@/api/lounges";
import { useTripStore } from '@/stores/trip';
import { RunningHomeView } from "@/components/RunningHomeView";
import { IdleHomeView } from "@/components/IdleHomeView";
import TripSummary from "@/components/TripSummary";
import { TabScreen } from "@/components/layout/TabScreen";
import "./Home.css";

export default function Home() {
  const [summaryOpen, setSummaryOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const isRunning = useTripStore(s => s.isRunning);

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

  useEffect(() => {
    if (!summaryOpen) return;

    const timer = window.setTimeout(() => {
      setSummaryOpen(false);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [summaryOpen]);

  return (
    <TabScreen>
      {isRunning ? <RunningHomeView /> : <IdleHomeView />}
      <TripSummary
        open={summaryOpen}
        onClose={() => setSummaryOpen(false)}
      />
    </TabScreen>
  );
}
