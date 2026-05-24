type RestTimerProps = {
  elapsedText: string;
};

export function RestTimer({ elapsedText }: RestTimerProps) {
  return (
    <section className="border-b border-zinc-300 text-center">
      <div className="px-4 py-3 text-sm font-medium text-zinc-500">
        현재 휴식 시간
      </div>

      <div className="border-t border-zinc-200 px-4 py-3">
        <p className="text-3xl font-extrabold text-orange-700">{elapsedText}</p>
      </div>

      <div className="border-t border-zinc-200 px-4 py-2">
        <p className="text-xs font-medium text-zinc-500">
          목표 휴식: 30분 이상(MVP 20초 조정)
        </p>
      </div>
    </section>
  );
}
