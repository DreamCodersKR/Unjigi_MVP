import { useNavigate } from "react-router-dom";
import { Button as UIButton } from "@/components/ui/button";

export function RunStartButton() {
  const navigate = useNavigate();

  return (
    <UIButton
      onClick={() => navigate("/start-trip")}
      className="h-auto w-full rounded-lg bg-orange-50 p-6 text-center text-lg font-bold text-orange-700 hover:bg-orange-100"
    >
      <span className="flex flex-col items-center justify-center gap-2 leading-none">
        <span className="text-xl">🚚 운행 시작</span>
        <span className="text-sm font-medium text-orange-500">탭하여 시작</span>
      </span>
    </UIButton>
  );
}
