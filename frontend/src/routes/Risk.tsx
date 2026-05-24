import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiskGauge } from "@/components/RiskGauge";
import { RiskSparkline } from "@/components/RiskSparkline";
import { NearbyLoungeButton } from "@/components/NearbyLoungeButton";
import { useRisk } from "@/hooks/useRisk";
import { Button } from "@/components/ui/button";
import { RunEndButton } from "@/components/RunEndButton";
import { BottomTabBar } from "@/components/BottomTabBar";
import { RiskFactors } from "@/components/RiskFactors";
import { useBackgroundEntryToast } from "@/hooks/useBackgroundEntryToast";
import { useProactiveCompanion } from "@/hooks/useProactiveCompanion";
import { useRestAreaDetection } from "@/hooks/useRestAreaDetection";
import { useTripStore } from "@/stores/trip";

export default function Risk() {
  const navigate = useNavigate();
  const { data, isLoading } = useRisk();
  const { currentLevel, tripStartedAt, isRunning, updateRisk } = useTripStore();

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
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-2">운행 위험도</h1>

      <RiskGauge score={data.score} level={data.level} />

      <div>
        <h2 className="text-sm text-gray-500">최근 30분 추이</h2>
        <RiskSparkline data={data.history} />
      </div>
      <Button
        size="lg"
        className="h-auto w-full bg-orange-500 py-3 text-lg font-bold mb-1"
        onClick={() => navigate("/")}
      >
        기본 화면으로
      </Button>
      <RiskFactors
        driveDurationText={data?.factors[0]?.message}
        visibilityText={data?.factors[0]?.type}
      />
      <NearbyLoungeButton distance={12} />
      <div className="fixed inset-x-0 bottom-24 z-40 px-4">
        <RunEndButton />
      </div>
      <BottomTabBar />
    </div>
  );
}
