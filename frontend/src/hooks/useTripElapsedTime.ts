import { useEffect, useMemo, useState } from "react";

function formatElapsedTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분 ${String(seconds).padStart(2, "0")}초`;
  }

  return `${minutes}분 ${String(seconds).padStart(2, "0")}초`;
}

export function useTripElapsedTime(tripStartedAt: string | null) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!tripStartedAt) {
      setElapsedSeconds(0);
      return;
    }

    const updateElapsed = () => {
      const startedAt = new Date(tripStartedAt).getTime();
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    };

    updateElapsed();
    const timerId = window.setInterval(updateElapsed, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [tripStartedAt]);

  return useMemo(
    () => formatElapsedTime(elapsedSeconds),
    [elapsedSeconds],
  );
}
