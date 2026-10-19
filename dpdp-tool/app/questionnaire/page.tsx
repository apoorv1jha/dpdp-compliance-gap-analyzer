"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { obligations } from "@/lib/dpdp-sections";
import { QuestionnaireAnswers } from "@/lib/types";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";

export default function QuestionnairePage() {
  const router = useRouter();
  const allQuestions = useMemo(() => obligations.flatMap((o) => o.questions), []);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});

  const current = allQuestions[index];
  const isLast = index === allQuestions.length - 1;

  function handleSelect(optionId: string) {
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
  }

  function goNext() {
    if (isLast) {
      window.localStorage.setItem("dpdp_answers", JSON.stringify(answers));
      router.push("/report");
    } else {
      setIndex((i) => i + 1);
    }
  }

  function goBack() {
    if (index > 0) setIndex((i) => i - 1);
  }

  const canProceed = Boolean(answers[current.id]);

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-10">
          <Link href="/" className="font-sans text-sm text-slate hover:text-ink">
            &larr; Exit
          </Link>
        </div>

        <div className="mb-10">
          <ProgressBar current={index + 1} total={allQuestions.length} />
        </div>

        <QuestionCard question={current} selected={answers[current.id]} onSelect={handleSelect} />

        <div className="flex items-center justify-between mt-10 pt-6 border-t border-rule">
          <button
            onClick={goBack}
            disabled={index === 0}
            className="font-sans text-sm text-slate disabled:opacity-0 hover:text-ink"
          >
            &larr; Previous
          </button>
          <button
            onClick={goNext}
            disabled={!canProceed}
            className="font-sans text-sm px-5 py-2.5 rounded-lg bg-ink text-paper disabled:bg-rule disabled:text-slate transition-colors"
          >
            {isLast ? "See report" : "Next clause"}
          </button>
        </div>
      </div>
    </main>
  );
}
