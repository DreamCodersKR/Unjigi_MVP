import { useState } from "react";
import { useTripStore } from "@/stores/trip";
import { ConfirmWindow } from "@/components/ConfirmWindow";
import { Button as UIButton } from "@/components/ui/button";

export function RunStartButton() {
  const [open, setOpen] = useState(false);
  const startTrip = useTripStore((s) => s.startTrip);

  const handleConfirm = () => {
    startTrip("demo");
    setOpen(false);
  };

  return (
    <div className="
      bg-orange-50 
      p-3 
      rounded-lg 
      m-10 
      text-center 
      font-bold 
      text-orange-700"
    >
      <UIButton 
        onClick={() => setOpen(true)}
        className="
          bg-orange-50 
          p-3 
          rounded-lg 
          mb-4 
          text-center 
          font-bold 
          text-orange-700 
          text-lg
        "
      >
        🚛운행 시작
      </UIButton>
      <ConfirmWindow
        open={open}
        message="운행을 시작하시겠습니까?"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}
