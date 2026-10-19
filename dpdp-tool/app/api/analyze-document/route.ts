import { NextRequest, NextResponse } from "next/server";
import { heuristicScan } from "@/lib/heuristic-scan";

export const runtime = "nodejs";

// Free LLM provider: Groq (OpenAI-compatible endpoint, free tier, no credit card).
// Get a key at https://console.groq.com/keys
// With no key set, the route falls back to the offline keyword scanner.
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are a privacy compliance analyst reviewing documents against India's Digital Personal Data Protection Act, 2023 (DPDP Act).

Read the user-supplied document (a privacy policy, consent notice, or similar) and assess it against these obligations:
- Section 5: Notice must be itemised, describing personal data collected and purpose, in clear language.
- Section 6: Consent must be free, specific, informed, unconditional, unambiguous, and easy to withdraw.
- Section 8: General obligations - security safeguards, breach notification, accuracy, retention/erasure limits.
- Section 9: Verifiable parental consent for children's data; no tracking/targeted ads to children.
- Section 10: Significant Data Fiduciary duties (DPO, DPIA, audits) if applicable.
- Sections 11-14: Data Principal rights - access, correction, erasure, grievance redressal, nomination.
- Section 16: Cross-border transfer disclosure.

Respond ONLY with a JSON object, no markdown fences, no preamble, matching exactly this shape:
{
  "summary": "2-3 sentence plain-language summary of overall posture",
  "overallRisk": "high" | "medium" | "low" | "compliant",
  "findings": [
    {
      "clause": "e.g. Section 6 - Consent",
      "issue": "what is missing, vague, or non-compliant, stated plainly",
      "severity": "high" | "medium" | "low",
      "recommendation": "concrete fix, one to two sentences"
    }
  ]
}
Include at most 8 findings, ordered by severity (high first). If the document handles an area well, do not invent a finding for it.`;

export async function POST(req: NextRequest) {
  try {
    const { document } = await req.json();

    if (!document || typeof document !== "string" || document.trim().length < 50) {
      return NextResponse.json({ error: "Document text is too short to analyze." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    // No key: use the free offline keyword scanner.
    if (!apiKey) {
      return NextResponse.json({ ...heuristicScan(document), mode: "keyword" });
    }

    // Free tier on the 70B model allows ~12k tokens/min, so keep input modest.
    const truncated = document.slice(0, 18000);

    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || DEFAULT_MODEL,
        temperature: 0.2,
        max_tokens: 1800,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Here is the document to analyze:\n\n${truncated}` },
        ],
      }),
    });

    if (!res.ok) {
      // Rate limited or model issue: degrade gracefully instead of failing.
      console.error("Groq error:", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ...heuristicScan(document), mode: "keyword-fallback" });
    }

    const data = await res.json();
    const raw: string = data?.choices?.[0]?.message?.content ?? "";

    try {
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      return NextResponse.json({ ...parsed, mode: "ai" });
    } catch {
      return NextResponse.json({ ...heuristicScan(document), mode: "keyword-fallback" });
    }
  } catch (err: any) {
    console.error("analyze-document error:", err);
    return NextResponse.json(
      { error: err?.message || "Unexpected error while analyzing document." },
      { status: 500 }
    );
  }
}
