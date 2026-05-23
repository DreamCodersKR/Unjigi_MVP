import { useNavigate } from "react-router-dom";
import { Button as UIButton } from "@/components/ui/button";

export function RunStartButton() {
  const navigate = useNavigate();

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
        onClick={() => navigate("/start-trip")}
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
        <span className="flex flex-col items-center justify-center gap-2 leading-none">
          <span className="text-xl">🚚 운행 시작</span>
          <span className="text-sm font-medium text-orange-500">탭하여 시작</span>
        </span>
      </UIButton>
    </div>
  );
}
