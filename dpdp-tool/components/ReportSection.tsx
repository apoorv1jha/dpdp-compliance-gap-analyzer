import { ObligationResult } from "@/lib/types";
import RiskBadge from "./RiskBadge";

export default function ReportSection({ result, index }: { result: ObligationResult; index: number }) {
  return (
    <div className="py-6 border-b border-rule">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex gap-4">
          <span className="clause-number font-serif text-slate text-sm pt-0.5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="font-sans text-sm font-medium">
              {result.title} <span className="text-slate font-normal">— {result.actReference}</span>
            </p>
            <p className="font-sans text-xs text-slate mt-1">
              {result.scoreEarned} / {result.scoreMax} points &middot; {result.percentage}%
            </p>
          </div>
        </div>
        <RiskBadge risk={result.risk} />
      </div>
      {result.gaps.length > 0 && (
        <ul className="ml-10 mt-3 space-y-1.5">
          {result.gaps.map((gap, i) => (
            <li key={i} className="font-sans text-sm text-slate leading-relaxed">
              &bull; {gap}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
