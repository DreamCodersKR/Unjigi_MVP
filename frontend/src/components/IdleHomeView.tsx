import { RunStartButton } from "@/components/RunStartButton";
import { QuickInfo } from "@/components/QuickInfo";
import { WakeWordToggle } from "@/components/WakeWordToggle";
import { Greeting } from "@/components/Greeting";

export function IdleHomeView() {
  return (
    <>
      <Greeting/>
      <RunStartButton/>
      <QuickInfo/>
      <WakeWordToggle/>
    </>
  );
}
