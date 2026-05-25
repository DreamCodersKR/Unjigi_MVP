import { useNavigate } from "react-router-dom";
import { Button as UIButton } from "@/components/ui/button";

export function RunStartButton() {
  const navigate = useNavigate();

  return (
    <UIButton
      onClick={() => navigate("/start-trip")}
      className="home-start-button"
    >
      <span className="home-start-button__content">
        <span className="home-start-button__title">🚚 운행 시작</span>
        <span className="home-start-button__hint">탭하여 시작</span>
      </span>
    </UIButton>
  );
}
