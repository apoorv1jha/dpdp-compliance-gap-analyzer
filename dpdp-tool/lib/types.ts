export type RiskLevel = "high" | "medium" | "low" | "compliant";

export interface AnswerOption {
  id: string;
  label: string;
  score: number; // 0 (worst) to 3 (best)
}

export interface Question {
  id: string;
  clause: string; // e.g. "Section 5"
  prompt: string;
  helper?: string;
  options: AnswerOption[];
}

export interface Obligation {
  id: string;
  title: string;
  actReference: string;
  description: string;
  questions: Question[];
}

export interface QuestionnaireAnswers {
  [questionId: string]: string; // selected option id
}

export interface ObligationResult {
  obligationId: string;
  title: string;
  actReference: string;
  scoreEarned: number;
  scoreMax: number;
  percentage: number;
  risk: RiskLevel;
  gaps: string[];
}

export interface DocumentFinding {
  clause: string;
  issue: string;
  severity: RiskLevel;
  recommendation: string;
}

export interface DocumentAnalysis {
  mode?: "ai" | "keyword" | "keyword-fallback";
  summary: string;
  overallRisk: RiskLevel;
  findings: DocumentFinding[];
}

export interface FullReport {
  generatedAt: string;
  questionnaire?: {
    obligations: ObligationResult[];
    overallScore: number;
    overallRisk: RiskLevel;
  };
  documentAnalysis?: DocumentAnalysis;
}
