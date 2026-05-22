import { NavLink, useNavigate } from "react-router-dom";
import { History, Map, Settings, Users } from "lucide-react";

const pendingMessage = "준비 중인 기능입니다";

export function BottomTabBar() {
  const navigate = useNavigate();

  const handlePendingClick = () => {
    alert(pendingMessage);
  };

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        <NavLink
          to="/map"
          className={({ isActive }) =>
            [
              "flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            ].join(" ")
          }
        >
          <Map className="size-5" aria-hidden="true" />
          <span>지도</span>
        </NavLink>

        <button
          type="button"
          onClick={handlePendingClick}
          className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <History className="size-5" aria-hidden="true" />
          <span>기록</span>
        </button>

        <button
          type="button"
          onClick={handlePendingClick}
          className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Users className="size-5" aria-hidden="true" />
          <span>가족</span>
        </button>

        <button
          type="button"
          onClick={() => {
            handlePendingClick();
            navigate(window.location.pathname);
          }}
          className="flex h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Settings className="size-5" aria-hidden="true" />
          <span>설정</span>
        </button>
      </div>
    </nav>
  );
}