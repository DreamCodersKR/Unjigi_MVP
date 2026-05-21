import { useState } from "react";
import { useTripStore } from "@/stores/trip";
import { ConfirmWindow } from "@/components/ConfirmWindow";
import { Button as UIButton } from "@/components/ui/button";

export function RunEndButton() {
  const [open, setOpen] = useState(false);
  const endTrip = useTripStore((s) => s.endTrip);

  const handleConfirm = () => {
    endTrip();
    setOpen(false);
  };

  return (
    <div>
      <UIButton 
        onClick={() => setOpen(true)}
        className="
          w-full
          max-w-sm
          h-14
          bg-red-600
          hover:bg-red-700
          text-white
          text-lg
          rounded-xl
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
