import type { ReactNode } from "react";
import { BottomTabBar } from "@/components/BottomTabBar";
import { cn } from "@/lib/utils";
import "./TabScreen.css";

type TabScreenProps = {
  children: ReactNode;
  bottomAction?: ReactNode;
  className?: string;
  contentClassName?: string;
};

type TabScreenContentProps = {
  children: ReactNode;
  className?: string;
};

export function TabScreen({
  children,
  bottomAction,
  className,
  contentClassName,
}: TabScreenProps) {
  return (
    <>
      <main
        className={cn(
          "tab-screen",
          bottomAction && "tab-screen--with-bottom-action",
          className
        )}
      >
        <TabScreenContent className={contentClassName}>{children}</TabScreenContent>
      </main>
      {bottomAction ? (
        <TabScreenBottomAction>{bottomAction}</TabScreenBottomAction>
      ) : null}
      <BottomTabBar />
    </>
  );
}

export function TabScreenContent({ children, className }: TabScreenContentProps) {
  return (
    <div className={cn("tab-screen__content", className)}>
      {children}
    </div>
  );
}

export function TabScreenBottomAction({ children }: TabScreenProps) {
  return (
    <div className="tab-screen__bottom-action">
      <div className="tab-screen__bottom-action-inner">{children}</div>
    </div>
  );
}
