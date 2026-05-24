type RiskFactorsProps = {
  driveDurationText?: string;
  visibilityText?: string;
};

export function RiskFactors({
  driveDurationText = "90분 연속 운행 중이에요",
  visibilityText = "long_drive",
}: RiskFactorsProps) {
  return (
    <section className="w-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-zinc-100 px-4 py-2">
        <span className="text-base">📊</span>
        <span className="text-sm font-medium text-orange-600">
          {driveDurationText}
        </span>
      </div>

      <div className="flex items-center gap-2 px-4 py-2">
        <span className="text-base">🌙</span>
        <span className="text-sm font-medium text-zinc-600">
          {visibilityText}
        </span>
      </div>
    </section>
  );
}
