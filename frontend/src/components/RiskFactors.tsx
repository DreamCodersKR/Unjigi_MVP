import type { RiskFactor } from "@/types/risk";

const FACTOR_LABELS: Partial<Record<string, string>> = {
  long_drive: "📊",
  night_time: "🌙",
};

const SEVERITY_TEXT_CLASS: Record<RiskFactor["severity"], string> = {
  low: "risk-factors__text--low",
  medium: "risk-factors__text--medium",
  high: "risk-factors__text--high",
};

type RiskFactorsProps = {
  factors: RiskFactor[];
};

export function RiskFactors({ factors }: RiskFactorsProps) {
  if (factors.length === 0) return null;

  return (
    <section className="risk-factors">
      {factors.map((factor, index) => (
        <div key={`${factor.type}-${index}`} className="risk-factors__row">
          <span className="risk-factors__icon" aria-hidden="true">
            {FACTOR_LABELS[factor.type] ?? factor.type}
          </span>
          <span className={`risk-factors__text ${SEVERITY_TEXT_CLASS[factor.severity]}`}>
            {factor.message}
          </span>
        </div>
      ))}
    </section>
  );
}
