import { useEffect, useState } from "react";
import "./TripSummary.css";

interface TripSummaryProps {
  open: boolean;
  onClose: () => void;
}

export default function TripSummary({
  open,
  onClose,
}: TripSummaryProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(5);

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
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [open]);

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
            value="5시간 32분"
          />

          <SummaryRow
            icon="🛣️"
            label="운행 거리"
            value="420 km"
          />

          <SummaryRow
            icon="🚀"
            label="평균 속도"
            value="76 km/h"
          />

          <SummaryRow
            icon="☕"
            label="휴식 시간"
            value="45분 (2회)"
          />

          <SummaryRow
            icon="⭐"
            label="안전 점수"
            value="82점"
            valueClassName="trip-summary-row__value--safe"
          />

          <div className="trip-summary__notice">
            👨‍👩‍👧 가족 알림 발송 완료
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
