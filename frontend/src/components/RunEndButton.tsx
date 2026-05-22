import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useTripStore } from "@/stores/trip";
import { ConfirmWindow } from "@/components/ConfirmWindow";
import { Button as UIButton } from "@/components/ui/button";

export function RunEndButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const endTrip = useTripStore((s) => s.endTrip);

  const handleConfirm = () => {
    endTrip();
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
        className="
          h-auto
          min-h-14
          w-full
          rounded-xl
          bg-red-600
          px-6
          py-3
          text-lg
          font-bold
          text-white
          shadow-sm
          hover:bg-red-700
        "
      >
        🚛운행 종료
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
