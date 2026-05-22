import { RunStartButton } from "@/components/RunStartButton";
import { BottomTabBar } from "@/components/BottomTabBar";
import { QuickInfo } from "@/components/QuickInfo";
import { WakeWordToggle } from "@/components/WakeWordToggle";
import { Greeting } from "@/components/Greeting";

export function IdleHomeView() {
  return (
    <div>
      <Greeting/>
      <RunStartButton/>
      <QuickInfo/>
      <WakeWordToggle/>
      <BottomTabBar/>
    </div>
  );
}
