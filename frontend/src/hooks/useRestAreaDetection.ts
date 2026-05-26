import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTripStore } from "@/stores/trip";

export function useRestAreaDetection() {
  const navigate = useNavigate();
  const isRunning = useTripStore((s) => s.isRunning);
  const isAtRestArea = useTripStore((s) => s.isAtRestArea);

  useEffect(() => {
    if (!isRunning || isAtRestArea) return;

    const timerId = window.setTimeout(() => {
      navigate("/rest-area");
    }, 5 * 60 * 1000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [isAtRestArea, isRunning, navigate]);
}
