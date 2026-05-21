import { useEffect } from "react";
import { dbping } from "@/api/lounges";
import { useTripStore } from '@/stores/trip';
import { RunningHomeView } from "@/components/RunningHomeView";
import { IdleHomeView } from "@/components/IdleHomeView";

export default function Home() {
  useEffect(() => {
    dbping();
  }, []);

  const isRunning = useTripStore(s => s.isRunning);


  return (
    <div className="min-h-screen bg-white p-4">
      {isRunning ? <RunningHomeView /> : <IdleHomeView />}
    </div>

  );
}