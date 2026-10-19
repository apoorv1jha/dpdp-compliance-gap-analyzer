import { obligations } from "./dpdp-sections";
import { ObligationResult, QuestionnaireAnswers, RiskLevel } from "./types";

function riskFromPercentage(pct: number): RiskLevel {
  if (pct >= 90) return "compliant";
  if (pct >= 65) return "low";
  if (pct >= 40) return "medium";
  return "high";
}

export function scoreQuestionnaire(answers: QuestionnaireAnswers): {
  obligations: ObligationResult[];
  overallScore: number;
  overallRisk: RiskLevel;
} {
  const results: ObligationResult[] = obligations.map((ob) => {
    let earned = 0;
    let max = 0;
    const gaps: string[] = [];

    ob.questions.forEach((q) => {
      max += 3;
      const selectedId = answers[q.id];
      const option = q.options.find((o) => o.id === selectedId);
      const score = option ? option.score : 0;
      earned += score;
      if (score <= 1) {
        gaps.push(`${q.clause}: ${q.prompt}`);
      }
    });

    const percentage = max > 0 ? Math.round((earned / max) * 100) : 0;

    return {
      obligationId: ob.id,
      title: ob.title,
      actReference: ob.actReference,
      scoreEarned: earned,
      scoreMax: max,
      percentage,
      risk: riskFromPercentage(percentage),
      gaps,
    };
  });

  const totalEarned = results.reduce((sum, r) => sum + r.scoreEarned, 0);
  const totalMax = results.reduce((sum, r) => sum + r.scoreMax, 0);
  const overallScore = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;

  return {
    obligations: results,
    overallScore,
    overallRisk: riskFromPercentage(overallScore),
  };
}
