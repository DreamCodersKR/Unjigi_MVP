type RestTimerProps = {
  elapsedText: string;
};

export function RestTimer({ elapsedText }: RestTimerProps) {
  return (
    <section className="rest-area-section rest-area-timer">
      <div className="rest-area-timer__label">
        ⏱ 휴식 시간
      </div>

      <div className="rest-area-timer__value">
        <p className="rest-area-timer__text">{elapsedText}</p>
      </div>

      <div className="rest-area-timer__meta">
        <p className="rest-area-timer__meta-text">
          목표 휴식: 30분 이상
        </p>
      </div>
    </section>
  );
}
