import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useTripStore } from "@/stores/trip";
import "./StartTripModal.css";

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
    <div className="start-trip-modal">
      <div className="start-trip-modal__window">
        <header className="start-trip-modal__header">
          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="닫기"
            className="start-trip-modal__close"
          >
            ×
          </button>
          <div className="start-trip-modal__title">운행 시작</div>
        </header>

        <main className="start-trip-modal__body">
          <section className="start-trip-modal__prompt">
            <span aria-hidden="true">🚚</span>
            <span>어떻게 시작할까요?</span>
          </section>

          <section className="start-trip-modal__options">
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

          <label className="start-trip-modal__destination">
            <span className="start-trip-modal__destination-label">목적지 (선택):</span>
            <input
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              className="start-trip-modal__destination-input"
            />
          </label>

          <footer className="start-trip-modal__footer">
            <button
              type="button"
              onClick={handleStart}
              className="start-trip-modal__submit"
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
    <div
      className="trip-mode-option"
      style={{ "--trip-mode-accent": accent } as CSSProperties}
    >
      <span className="trip-mode-option__label">
        {label}
      </span>

      <button
        type="button"
        onClick={onClick}
        aria-pressed={checked}
        className="trip-mode-option__button"
      >
        <div className="trip-mode-option__title">
          <span aria-hidden="true">|</span>
          <span>{title}</span>
        </div>
        <div className="trip-mode-option__descriptions">
          {descriptions.map((description) => (
            <p key={description}>· {description}</p>
          ))}
        </div>
      </button>

      <div className="trip-mode-option__tail" />
    </div>
  );
}
