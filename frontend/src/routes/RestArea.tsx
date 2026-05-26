import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTripStore } from "@/stores/trip";
import { RunEndButton } from "@/components/RunEndButton";
import { RestHeader } from "@/components/rest/RestHeader";
import { RestTimer } from "@/components/rest/RestTimer";
import { FacilityCards } from "@/components/rest/FacilityCards";
import { ResumeButton } from "@/components/rest/ResumeButton";
import { ShortRestWarnModal } from "@/components/rest/ShortRestWarnModal";
import "./RestArea.css";

const MIN_REST_SECONDS = 30 * 60;

function formatElapsedTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}분 ${String(seconds).padStart(2, "0")}초`;
}

export default function RestArea() {
  const navigate = useNavigate();
  const isRunning = useTripStore((s) => s.isRunning);
  const enterRestArea = useTripStore((s) => s.enterRestArea);
  const exitRestArea = useTripStore((s) => s.exitRestArea);
  const [restStartedAt] = useState(() => Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [warnOpen, setWarnOpen] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    enterRestArea();
  }, [enterRestArea, isRunning]);

  useEffect(() => {
    const updateElapsed = () => {
      setElapsedSeconds(Math.floor((Date.now() - restStartedAt) / 1000));
    };

    updateElapsed();
    const timerId = window.setInterval(updateElapsed, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [restStartedAt]);

  const elapsedText = useMemo(
    () => formatElapsedTime(elapsedSeconds),
    [elapsedSeconds],
  );

  const canResumeWithoutWarning = elapsedSeconds >= MIN_REST_SECONDS;
  const remainingRestMinutes = Math.ceil(
    Math.max(MIN_REST_SECONDS - elapsedSeconds, 0) / 60,
  );
  const resumeButtonLabel = canResumeWithoutWarning
    ? "🚛운행 재개"
    : `✅${remainingRestMinutes}분 더 쉬세요`;

  const resumeTrip = () => {
    exitRestArea();
    navigate("/risk");
  };

  const handleResumeClick = () => {
    if (!canResumeWithoutWarning) {
      setWarnOpen(true);
      return;
    }

    resumeTrip();
  };

  if (!isRunning) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="rest-area-screen">
      <div className="rest-area-panel">
        <RestHeader />

        <RestTimer
          elapsedText={elapsedText}
        />

        <FacilityCards />

        <ResumeButton
          disabled={false}
          isRecommended={canResumeWithoutWarning}
          label={resumeButtonLabel}
          onClick={handleResumeClick}
        />

        <div className="rest-area-end-action">
          <RunEndButton />
        </div>
      </div>

      <ShortRestWarnModal
        open={warnOpen}
        onCancel={() => setWarnOpen(false)}
        onConfirm={resumeTrip}
      />
    </main>
  );
}
