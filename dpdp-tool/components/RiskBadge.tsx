import { RiskLevel } from "@/lib/types";

const styles: Record<RiskLevel, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-risk-high/10", text: "text-risk-high", label: "High risk" },
  medium: { bg: "bg-risk-medium/10", text: "text-risk-medium", label: "Needs attention" },
  low: { bg: "bg-risk-low/10", text: "text-risk-low", label: "Mostly aligned" },
  compliant: { bg: "bg-risk-low/10", text: "text-risk-low", label: "Compliant" },
};

export default function RiskBadge({ risk }: { risk: RiskLevel }) {
  const s = styles[risk];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.bg} ${s.text}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}
