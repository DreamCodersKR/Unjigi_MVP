import { NavLink, useNavigate } from "react-router-dom";
import { History, Map, Settings, Users } from "lucide-react";
import "./BottomTabBar.css";

const pendingMessage = "준비 중인 기능입니다";

export function BottomTabBar() {
  const navigate = useNavigate();

  const handlePendingClick = () => {
    alert(pendingMessage);
  };

  return (
    <nav className="bottom-tab-bar">
      <div className="bottom-tab-bar__grid">
        <NavLink
          to="/map"
          className={({ isActive }) =>
            [
              "bottom-tab-bar__item",
              isActive ? "bottom-tab-bar__item--active" : "",
            ].join(" ")
          }
        >
          <Map className="bottom-tab-bar__icon" aria-hidden="true" />
          <span>지도</span>
        </NavLink>

        <button
          type="button"
          onClick={handlePendingClick}
          className="bottom-tab-bar__item"
        >
          <History className="bottom-tab-bar__icon" aria-hidden="true" />
          <span>기록</span>
        </button>

        <button
          type="button"
          onClick={handlePendingClick}
          className="bottom-tab-bar__item"
        >
          <Users className="bottom-tab-bar__icon" aria-hidden="true" />
          <span>가족</span>
        </button>

        <button
          type="button"
          onClick={() => {
            handlePendingClick();
            navigate(window.location.pathname);
          }}
          className="bottom-tab-bar__item"
        >
          <Settings className="bottom-tab-bar__icon" aria-hidden="true" />
          <span>설정</span>
        </button>
      </div>
    </nav>
  );
}
