import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTripStore } from "@/stores/trip";

type TripMode = "normal" | "demo";

export default function StartTripModal() {
  const navigate = useNavigate();
  const startTrip = useTripStore((s) => s.startTrip);
  const [mode, setMode] = useState<TripMode>("normal");
  const [destination, setDestination] = useState("");

  const handleStart = () => {
    startTrip(mode, destination.trim() || undefined);
    navigate("/risk");
  };

  return (
    <div className="fixed inset-0 z-50 bg-white font-sans text-[13px] text-[#222]">
      <div className="flex h-dvh w-full flex-col border border-[#777] bg-white">
        <header className="grid h-6 shrink-0 grid-cols-[24px_1fr_24px] items-center border-b border-[#777] bg-[#e6e6e6]">
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="닫기"
            className="h-full border-r border-[#999] text-lg leading-none"
          >
            ×
          </button>
          <div className="text-center text-[14px] font-semibold">운행 시작</div>
        </header>

        <main className="flex min-h-0 flex-1 flex-col">
          <section className="flex h-[52px] shrink-0 items-center gap-2 border-b border-[#999] px-3 text-[16px] font-bold">
            <span aria-hidden="true">🚚</span>
            <span>어떻게 시작할까요?</span>
          </section>

          <section className="flex min-h-0 flex-1 flex-col justify-start gap-10 border-b border-[#999] bg-[#fafafa] px-3 py-8">
            <ModeOption
              accent="#f15a24"
              checked={mode === "normal"}
              label="일반 운행"
              title="실제 운행 시작"
              descriptions={["Claude API 실시간", "GPS·시간 기반 위험도"]}
              onClick={() => setMode("normal")}
            />

            <ModeOption
              accent="#1d5cff"
              checked={mode === "demo"}
              label="시연 모드"
              title="데모용 (mock 시나리오)"
              descriptions={["90분 시나리오 자동 진행", "사전 응답 30개 사용"]}
              onClick={() => setMode("demo")}
            />
          </section>

          <label className="flex h-[54px] shrink-0 items-center gap-1 border-b border-[#999] bg-[#fafafa] px-2">
            <span className="shrink-0 text-[13px]">목적지 (선택):</span>
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="h-[22px] min-w-0 flex-1 border border-[#777] bg-white px-1 text-[13px] outline-none"
            />
          </label>

          <footer className="shrink-0 bg-[#ffe5dc] p-1">
            <button
              type="button"
              onClick={handleStart}
              className="h-12 w-full border border-transparent text-[13px] font-bold text-[#d94716] active:border-[#d94716]"
            >
              [🚚 운행 시작]
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
}

type ModeOptionProps = {
  accent: string;
  checked: boolean;
  label: string;
  title: string;
  descriptions: string[];
  onClick: () => void;
};

function ModeOption({
  accent,
  checked,
  label,
  title,
  descriptions,
  onClick,
}: ModeOptionProps) {
  return (
    <div className="relative border-t pt-3" style={{ borderColor: accent }}>
      <span
        className="absolute -top-[8px] left-3 bg-[#fafafa] px-1 font-semibold"
        style={{ color: accent }}
      >
        {label}
      </span>

      <button
        type="button"
        onClick={onClick}
        aria-pressed={checked}
        className="w-full border px-3 py-3 text-left"
        style={{
          borderColor: checked ? accent : "#c8c8c8",
          backgroundColor: checked ? `${accent}1f` : "#fff",
          color: checked ? accent : "#333",
        }}
      >
        <div className="mb-2 flex items-center gap-2 font-semibold">
          <span aria-hidden="true">|</span>
          <span>{title}</span>
        </div>
        <div className="space-y-1 pl-4 text-[#444]">
          {descriptions.map((description) => (
            <p key={description}>· {description}</p>
          ))}
        </div>
      </button>

      <div className="mt-4 h-[18px] border-b border-l" style={{ borderColor: accent }} />
    </div>
  );
}
