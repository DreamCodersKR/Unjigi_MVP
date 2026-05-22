import { Navigate } from "react-router-dom";
import { useTripStore } from "@/stores/trip";
import { RunEndButton } from "@/components/RunEndButton";
import { RestHeader } from "@/components/rest/RestHeader";
import { RestTimer } from "@/components/rest/RestTimer";
import { FacilityCards } from "@/components/rest/FacilityCards";
import { ResumeButton } from "@/components/rest/ResumeButton";
import { ShortRestWarnModal } from "@/components/rest/ShortRestWarnModal";

export default function RestArea() {
  const isRunning = useTripStore((s) => s.isRunning);

  if (!isRunning) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-white px-4 py-3 pb-28">
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-md border border-zinc-300 bg-white shadow-sm">
        <RestHeader />

        <RestTimer />

        <FacilityCards />

        <ResumeButton />

        <div className="border-t border-zinc-200 px-4 py-4">
          <RunEndButton />
        </div>
      </div>

      <ShortRestWarnModal open={false} />
    </main>
  );
}