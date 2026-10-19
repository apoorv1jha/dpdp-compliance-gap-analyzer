"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AnalyzePage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.includes("text") && !file.name.endsWith(".txt") && !file.name.endsWith(".md")) {
      setError("Only plain text (.txt/.md) files are supported. Paste the content instead if your policy is a PDF or Word doc.");
      return;
    }
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result || ""));
    reader.readAsText(file);
  }

  async function handleAnalyze() {
    if (text.trim().length < 50) {
      setError("Paste at least a few paragraphs of your privacy policy or consent notice.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/analyze-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document: text }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Analysis failed. Please try again.");
      }
      const data = await res.json();
      window.localStorage.setItem("dpdp_doc_analysis", JSON.stringify(data));
      router.push("/report");
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-14">
        <Link href="/" className="font-sans text-sm text-slate hover:text-ink">
          &larr; Exit
        </Link>

        <header className="mt-8 mb-8">
          <p className="font-sans text-xs text-amber mb-3">Document review</p>
          <h1 className="font-serif text-3xl font-semibold mb-3">
            Paste your privacy policy or consent notice
          </h1>
          <p className="font-sans text-sm text-slate leading-relaxed max-w-prose">
            The text is checked against the Act's notice, consent, and rights
            requirements, and clauses that are missing, vague, or non-compliant are flagged.
            Nothing is stored beyond generating your report.
          </p>
        </header>

        <div
          className="border border-dashed border-rule rounded-lg p-4 mb-4 text-center cursor-pointer hover:border-ink transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
          }}
        >
          <p className="font-sans text-sm text-slate">
            {fileName ? `Loaded: ${fileName}` : "Drop a .txt file here, or click to browse"}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,text/plain"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Or paste the full text of your privacy policy here..."
          rows={14}
          className="w-full rounded-lg border border-rule bg-white/60 p-4 font-sans text-sm leading-relaxed focus:outline-none focus:border-ink resize-y"
        />

        {error && (
          <p className="font-sans text-sm text-risk-high mt-3">{error}</p>
        )}

        <div className="flex items-center justify-end mt-6">
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="font-sans text-sm px-5 py-2.5 rounded-lg bg-ink text-paper disabled:opacity-50 transition-colors"
          >
            {loading ? "Reading against the Act..." : "Analyze document"}
          </button>
        </div>
      </div>
    </main>
  );
}
