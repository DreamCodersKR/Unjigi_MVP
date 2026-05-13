import { RiskGauge } from "@/components/ui/riskGauge";

export default function Test() {

  return (
  <div>
    <div>TEST</div>
    <div className="grid grid-cols-2 gap-4 p-8">
      <RiskGauge score={23} level="L1" />
      <RiskGauge score={47} level="L2" />
      <RiskGauge score={75} level="L3" />
      <RiskGauge score={92} level="L4" />
    </div>

  </div>
  );
}