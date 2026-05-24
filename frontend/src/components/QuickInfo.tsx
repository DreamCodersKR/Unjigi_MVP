export function QuickInfo() {
  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-base">📍</span>
          <span className="text-sm font-medium text-zinc-700">
            가까운 라운지
          </span>
        </div>
        <span className="text-sm font-semibold text-zinc-900">1곳 (5km)</span>
      </div>

      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-base">💤</span>
          <span className="text-sm font-medium text-zinc-700">어제 운행</span>
        </div>
        <span className="text-sm font-semibold text-zinc-900">8시간 12분</span>
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-base">⭐</span>
          <span className="text-sm font-medium text-zinc-700">안전 점수</span>
        </div>
        <span className="text-sm font-semibold text-zinc-900">87점</span>
      </div>
    </section>
  );
}
