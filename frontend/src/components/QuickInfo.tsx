export function QuickInfo() {
  return (
    <section className="home-quick-info">
      <div className="home-quick-info__row">
        <div className="home-quick-info__label">
          <span className="home-quick-info__icon">📍</span>
          <span className="home-quick-info__text">
            가까운 라운지
          </span>
        </div>
        <span className="home-quick-info__value">1곳 (5km)</span>
      </div>

      <div className="home-quick-info__row">
        <div className="home-quick-info__label">
          <span className="home-quick-info__icon">💤</span>
          <span className="home-quick-info__text">어제 운행</span>
        </div>
        <span className="home-quick-info__value">8시간 12분</span>
      </div>

      <div className="home-quick-info__row">
        <div className="home-quick-info__label">
          <span className="home-quick-info__icon">⭐</span>
          <span className="home-quick-info__text">안전 점수</span>
        </div>
        <span className="home-quick-info__value">87점</span>
      </div>
    </section>
  );
}
