import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiskGauge } from "@/components/RiskGauge";
import { RiskSparkline } from "@/components/RiskSparkline";
import { NearbyLoungeButton } from "@/components/NearbyLoungeButton";
import { useRisk } from "@/hooks/useRisk";
import { Button } from "@/components/ui/button";
import { RunEndButton } from "@/components/RunEndButton";
import { RiskFactors } from "@/components/RiskFactors";
import { TabScreen } from "@/components/layout/TabScreen";
import { UnjigiCallButton } from "@/components/voice/UnjigiCallButton";
import { useBackgroundEntryToast } from "@/hooks/useBackgroundEntryToast";
import { useProactiveCompanion } from "@/hooks/useProactiveCompanion";
import { useRestAreaDetection } from "@/hooks/useRestAreaDetection";
import { useTripElapsedTime } from "@/hooks/useTripElapsedTime";
import { useTripStore } from "@/stores/trip";
import "./Risk.css";

export default function Risk() {
  const navigate = useNavigate();
  const { data, isLoading } = useRisk();
  const { currentLevel, tripStartedAt, isRunning, updateRisk } = useTripStore();
  const elapsedText = useTripElapsedTime(tripStartedAt);

  useEffect(() => {
    if (!isRunning) {
      navigate("/", { replace: true });
    }
  }, [isRunning, navigate]);

  useEffect(() => {
    if (!data) return;
    updateRisk(data.score, data.level);
  }, [data, updateRisk]);

  useBackgroundEntryToast();
  useRestAreaDetection();

  useProactiveCompanion({
    level: currentLevel,
    tripStartedAt,
  });

  if (!isRunning) return null;
  if (isLoading) return <div>로딩 중...</div>;
  if (!data) return <div>데이터 없음</div>;

  return (
    <TabScreen
      contentClassName="risk-screen__content"
      bottomAction={<RunEndButton />}
    >
      <h1 className="risk-screen__title">운행 위험도</h1>

      <section className="risk-screen__summary-grid">
        <div className="risk-screen__elapsed-card">
          <div className="risk-screen__elapsed-label">
            운행 시간
          </div>
          <div className="risk-screen__elapsed-value">
            <p className="risk-screen__elapsed-text">{elapsedText}</p>
          </div>
        </div>

        <RiskGauge score={data.score} level={data.level} compact />
      </section>

      <section>
        <h2 className="risk-screen__chart-title">최근 30분 추이</h2>
        <RiskSparkline data={data.history} height={68} />
      </section>

      <Button
        size="lg"
        className="risk-screen__home-button"
        onClick={() => navigate("/")}
      >
        기본 화면으로
      </Button>

      <RiskFactors factors={data.factors} />

      <UnjigiCallButton />

      <NearbyLoungeButton distance={12} />
    </TabScreen>
  );
}
