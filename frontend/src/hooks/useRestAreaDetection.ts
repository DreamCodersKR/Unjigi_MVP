import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTripStore } from "@/stores/trip";

//const MOCK_REST_AREA_DETECT_MS = import.meta.env.DEV ? 10_000 : 5 * 60 * 1000;

export function useRestAreaDetection() {
  const navigate = useNavigate();
  const isRunning = useTripStore((s) => s.isRunning);
  const isAtRestArea = useTripStore((s) => s.isAtRestArea);
  const enterRestArea = useTripStore((s) => s.enterRestArea);

  useEffect(() => {
    if (!isRunning || isAtRestArea) return;

    const timerId = window.setTimeout(() => {
      enterRestArea();
      navigate("/rest-area");
    }, 20 * 1000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [enterRestArea, isAtRestArea, isRunning, navigate]);
}
