import { useEffect, useState } from "react";
import { RiskSparkline } from "@/components/RiskSparkline";
import { getElapsedMinutes, useTripStore } from "@/stores/trip";
import "./TripSummary.css";

const ESTIMATED_AVERAGE_SPEED_KMH = 84;

interface TripSummaryProps {
  open: boolean;
  onClose: () => void;
}

export default function TripSummary({
  open,
  onClose,
}: TripSummaryProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(5);
  const tripStartedAt = useTripStore((s) => s.tripStartedAt);
  const currentScore = useTripStore((s) => s.currentScore);
  const riskHistory = useTripStore((s) => s.riskHistory);
  const rests = useTripStore((s) => s.rests);

  const elapsedMinutes = tripStartedAt ? getElapsedMinutes(tripStartedAt) : 0;
  const elapsedHours = elapsedMinutes / 60;
  const estimatedDistanceKm = Math.max(
    Math.round(elapsedHours * ESTIMATED_AVERAGE_SPEED_KMH),
    0
  );
  const totalRestMinutes = getTotalRestMinutes(rests);
  const restCount = rests.length;
  const averageRiskScore = getAverageRiskScore(riskHistory, currentScore);
  const safetyScore = Math.max(Math.round(100 - averageRiskScore), 0);

  useEffect(() => {
    if (!open) {
      setRemainingSeconds(5);
      return;
    }

    setRemainingSeconds(5);

    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          window.setTimeout(onClose, 0);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="trip-summary">
      <div className="trip-summary__panel">
        <div className="trip-summary__header">
          <h2 className="trip-summary__title">
            🎉 운행 완료!
          </h2>
        </div>

        <div className="trip-summary__body">
          <SummaryRow
            icon="⏱"
            label="운행 시간"
            value={formatElapsedMinutes(elapsedMinutes)}
          />

          <SummaryRow
            icon="🛣️"
            label="운행 거리(예상)"
            value={`${estimatedDistanceKm} km`}
          />

          <SummaryRow
            icon="🚚"
            label="평균 속도(예상)"
            value={`${ESTIMATED_AVERAGE_SPEED_KMH} km/h`}
          />

          <SummaryRow
            icon="☕"
            label="휴식 시간"
            value={`${formatElapsedMinutes(totalRestMinutes)} (${restCount}회)`}
          />

          <SummaryRow
            icon="⭐"
            label="안전 점수"
            value={`${safetyScore}점`}
            valueClassName="trip-summary-row__value--safe"
          />

          {riskHistory.length > 0 ? (
            <section className="trip-summary__risk-trend">
              <h3 className="trip-summary__risk-trend-title">
                위험도 추이
              </h3>
              <RiskSparkline data={riskHistory} height={56} />
            </section>
          ) : null}

          <div className="trip-summary__notice">
            👨‍👩‍👧가족 알림 발송 완료
            <span className="trip-summary__notice-meta">(mock)</span>
          </div>
        </div>

        <div className="trip-summary__footer">
          <button
            type="button"
            onClick={onClose}
            className="trip-summary__close"
          >
            요약 화면 종료
          </button>

          <p className="trip-summary__countdown">
            자동 {remainingSeconds}초 후 메인 화면으로 이동
          </p>
        </div>
      </div>
    </div>
  );
}

interface SummaryRowProps {
  icon: string;
  label: string;
  value: string;
  valueClassName?: string;
}

function SummaryRow({
  icon,
  label,
  value,
  valueClassName = "",
}: SummaryRowProps) {
  return (
    <div className="trip-summary-row">
      <div className="trip-summary-row__label">
        <span>{icon}</span>
        <span className="trip-summary-row__label-text">{label}</span>
      </div>

      <span className={["trip-summary-row__value", valueClassName].filter(Boolean).join(" ")}>
        {value}
      </span>
    </div>
  );
}

function formatElapsedMinutes(totalMinutes: number) {
  if (totalMinutes < 1) return "1분 미만";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}분`;
  if (minutes === 0) return `${hours}시간`;

  return `${hours}시간 ${minutes}분`;
}

function getAverageRiskScore(
  riskHistory: { score: number }[],
  fallbackScore: number
) {
  if (riskHistory.length === 0) return fallbackScore;

  const totalRiskScore = riskHistory.reduce(
    (total, item) => total + item.score,
    0
  );

  return totalRiskScore / riskHistory.length;
}

function getTotalRestMinutes(rests: {
  restStartedAt: string;
  restFinishedAt: string | null;
}[]) {
  return rests.reduce((totalMinutes, rest) => {
    if (!rest.restFinishedAt) return totalMinutes;

    const startedAt = new Date(rest.restStartedAt).getTime();
    const finishedAt = new Date(rest.restFinishedAt).getTime();
    const restMinutes = Math.max(
      Math.floor((finishedAt - startedAt) / 60000),
      0
    );

    return totalMinutes + restMinutes;
  }, 0);
}
