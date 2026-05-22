import { useEffect, useState } from "react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="border-b px-6 py-5 text-center">
          <h2 className="text-xl font-bold text-emerald-600">
            🎉 운행 완료!
          </h2>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-6 text-sm text-gray-700">
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
            valueClassName="font-bold text-emerald-600"
          />

          <div className="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700">
            👨‍👩‍👧 가족 알림 발송 완료
            <span className="ml-1 text-xs text-gray-500">(mock)</span>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-orange-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition hover:bg-orange-600 active:bg-orange-700"
          >
            메인 화면으로
          </button>

          <p className="mt-2 text-center text-xs text-gray-400">
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
  valueClassName = "text-gray-900",
}: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-b-0">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="font-medium">{label}</span>
      </div>

      <span className={valueClassName}>{value}</span>
    </div>
  );
}