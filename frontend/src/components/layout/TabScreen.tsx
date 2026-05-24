import type { ReactNode } from "react";
import { BottomTabBar } from "@/components/BottomTabBar";
import { cn } from "@/lib/utils";
import "./TabScreen.css";

type TabScreenProps = {
  children: ReactNode;
};

type TabScreenContentProps = {
  children: ReactNode;
  className?: string;
};

export function TabScreen({ children }: TabScreenProps) {
  return (
    <>
      <main className="tab-screen">
        <TabScreenContent>{children}</TabScreenContent>
      </main>
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
