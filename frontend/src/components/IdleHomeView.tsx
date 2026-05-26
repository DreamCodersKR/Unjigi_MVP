import { RunStartButton } from "@/components/RunStartButton";
import { QuickInfo } from "@/components/QuickInfo";
import { Greeting } from "@/components/Greeting";

export function IdleHomeView() {
  return (
    <>
      <Greeting/>
      <RunStartButton/>
      <QuickInfo/>
    </>
  );
}
