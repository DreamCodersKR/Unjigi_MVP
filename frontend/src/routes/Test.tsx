import { RiskGauge } from "@/components/RiskGauge";
import { RiskSparkline } from "@/components/RiskSparkline";
import mock_risk from '@/mocks/mock_risk.json';

export default function Test() {

  return (
  <div>
    <div>TEST</div>
    <div className="grid grid-cols-2 gap-4 p-8">
      <RiskGauge score={23} level="L1" />
      <RiskGauge score={47} level="L2" />
      <RiskGauge score={75} level="L3" />
      <RiskGauge score={92} level="L4" />
      <RiskSparkline data={mock_risk?.history}/>
    </div>

  </div>
  );
}