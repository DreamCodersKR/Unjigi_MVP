import { RiskGauge } from "@/components/RiskGauge";
import { RiskSparkline } from "@/components/RiskSparkline";
import mock_risk from '@/mocks/mock_risk.json';
import "./Test.css";

export default function Test() {

  return (
  <div className="test-screen">
    <div className="test-screen__title">TEST</div>
    <div className="test-screen__grid">
      <RiskGauge score={23} level="L1" />
      <RiskGauge score={47} level="L2" />
      <RiskGauge score={75} level="L3" />
      <RiskGauge score={92} level="L4" />
      <RiskSparkline data={mock_risk?.history}/>
    </div>

  </div>
  );
}
