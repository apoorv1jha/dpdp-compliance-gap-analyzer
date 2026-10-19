import { Question } from "@/lib/types";

export default function QuestionCard({
  question,
  selected,
  onSelect,
}: {
  question: Question;
  selected: string | undefined;
  onSelect: (optionId: string) => void;
}) {
  return (
    <div>
      <p className="font-sans text-xs text-amber mb-3">{question.clause}</p>
      <h2 className="font-serif text-2xl font-semibold leading-snug mb-2 max-w-prose">
        {question.prompt}
      </h2>
      {question.helper && (
        <p className="font-sans text-sm text-slate mb-6 max-w-prose">{question.helper}</p>
      )}
      <div className="flex flex-col gap-3 mt-6">
        {question.options.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`text-left rounded-lg border px-4 py-3.5 font-sans text-sm transition-colors ${
                isSelected
                  ? "border-ink bg-ink text-paper"
                  : "border-rule bg-white/50 hover:border-ink"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
