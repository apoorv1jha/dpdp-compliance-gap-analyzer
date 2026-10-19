"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { scoreQuestionnaire } from "@/lib/scoring";
import { DocumentAnalysis, QuestionnaireAnswers, RiskLevel } from "@/lib/types";
import RiskBadge from "@/components/RiskBadge";
import ReportSection from "@/components/ReportSection";

export default function ReportPage() {
  const [questionnaireResult, setQuestionnaireResult] = useState<ReturnType<typeof scoreQuestionnaire> | null>(null);
  const [docAnalysis, setDocAnalysis] = useState<DocumentAnalysis | null>(null);

  useEffect(() => {
    const rawAnswers = window.localStorage.getItem("dpdp_answers");
    if (rawAnswers) {
      const answers: QuestionnaireAnswers = JSON.parse(rawAnswers);
      setQuestionnaireResult(scoreQuestionnaire(answers));
    }
    const rawDoc = window.localStorage.getItem("dpdp_doc_analysis");
    if (rawDoc) {
      setDocAnalysis(JSON.parse(rawDoc));
    }
  }, []);

  const hasNothing = !questionnaireResult && !docAnalysis;

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-10 print:hidden">
          <Link href="/" className="font-sans text-sm text-slate hover:text-ink">
            &larr; Home
          </Link>
          {!hasNothing && (
            <button
              onClick={() => window.print()}
              className="font-sans text-sm px-4 py-2 rounded-lg border border-rule hover:border-ink transition-colors"
            >
              Print / Save as PDF
            </button>
          )}
        </div>

        <header className="mb-10 border-b border-rule pb-8">
          <p className="font-sans text-xs text-amber mb-3">Gap analysis report</p>
          <h1 className="font-serif text-3xl font-semibold mb-2">
            DPDP Act compliance findings
          </h1>
          <p className="font-sans text-sm text-slate">
            Generated {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </header>

        {hasNothing && (
          <div className="text-center py-16">
            <p className="font-sans text-sm text-slate mb-6">
              No report data found yet. Run the questionnaire or analyze a document first.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/questionnaire" className="font-sans text-sm underline underline-offset-4">
                Run questionnaire
              </Link>
              <Link href="/analyze" className="font-sans text-sm underline underline-offset-4">
                Analyze document
              </Link>
            </div>
          </div>
        )}

        {questionnaireResult && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold">Questionnaire results</h2>
              <div className="flex items-center gap-3">
                <span className="font-sans text-sm text-slate">{questionnaireResult.overallScore}% aligned</span>
                <RiskBadge risk={questionnaireResult.overallRisk} />
              </div>
            </div>
            <div>
              {questionnaireResult.obligations
                .slice()
                .sort((a, b) => a.percentage - b.percentage)
                .map((r, i) => (
                  <ReportSection key={r.obligationId} result={r} index={i} />
                ))}
            </div>
          </section>
        )}

        {docAnalysis && (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-semibold">Document scan results</h2>
              <RiskBadge risk={docAnalysis.overallRisk} />
            </div>
            <p className="font-sans text-sm text-slate leading-relaxed mb-3 max-w-prose">
              {docAnalysis.summary}
            </p>
            {docAnalysis.mode && docAnalysis.mode !== "ai" && (
              <p className="font-sans text-xs text-amber mb-8">
                {docAnalysis.mode === "keyword-fallback"
                  ? "AI review was unavailable (rate limit or error), so the keyword scan was used instead."
                  : "Scanned with the offline keyword checker. Add a free GROQ_API_KEY for an AI review."}
              </p>
            )}
            {(!docAnalysis.mode || docAnalysis.mode === "ai") && <div className="mb-5" />}
            {docAnalysis.findings.map((f, i) => (
              <div key={i} className="py-5 border-b border-rule">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className="font-sans text-sm font-medium">{f.clause}</p>
                  <RiskBadge risk={f.severity as RiskLevel} />
                </div>
                <p className="font-sans text-sm text-slate leading-relaxed mb-1.5">{f.issue}</p>
                <p className="font-sans text-sm text-ink leading-relaxed">
                  <span className="text-amber">Fix: </span>
                  {f.recommendation}
                </p>
              </div>
            ))}
          </section>
        )}

        {!hasNothing && (
          <footer className="pt-6 border-t border-rule print:hidden">
            <p className="font-sans text-xs text-slate leading-relaxed max-w-prose">
              This is a directional assessment, not legal advice. Share this report with
              counsel before making representations about DPDP Act compliance.
            </p>
          </footer>
        )}
      </div>
    </main>
  );
}
