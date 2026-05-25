type RiskFactorsProps = {
  driveDurationText?: string;
  visibilityText?: string;
};

export function RiskFactors({
  driveDurationText = "90분 연속 운행 중이에요",
  visibilityText = "long_drive",
}: RiskFactorsProps) {
  return (
    <section className="risk-factors">
      <div className="risk-factors__row risk-factors__row--primary">
        <span className="risk-factors__icon">📊</span>
        <span className="risk-factors__text risk-factors__text--primary">
          {driveDurationText}
        </span>
      </div>

      <div className="risk-factors__row">
        <span className="risk-factors__icon">🌙</span>
        <span className="risk-factors__text risk-factors__text--secondary">
          {visibilityText}
        </span>
      </div>
    </section>
  );
}
