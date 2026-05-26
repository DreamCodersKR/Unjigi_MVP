import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmWindow } from "@/components/ConfirmWindow";
import { Button as UIButton } from "@/components/ui/button";
import { useTripStore } from "@/stores/trip";
import "./RunEndButton.css";

export function RunEndButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isAtRestArea = useTripStore((s) => s.isAtRestArea);
  const exitRestArea = useTripStore((s) => s.exitRestArea);

  const handleConfirm = () => {
    if (isAtRestArea) {
      exitRestArea();
    }

    setOpen(false);

    navigate("/", {
      state: { showTripSummary: true },
      replace: true,
    });
  };

  return (
    <div>
      <UIButton
        onClick={() => setOpen(true)}
        className="run-end-button"
      >
        🚛 운행 종료
      </UIButton>
      <ConfirmWindow
        open={open}
        message="운행을 종료하시겠습니까?"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
