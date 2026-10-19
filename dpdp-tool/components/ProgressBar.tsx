export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-xs text-slate font-sans">
        <span>
          Clause {current} of {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div className="h-1 w-full bg-rule rounded-full overflow-hidden">
        <div
          className="h-full bg-ink transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
