import Link from "next/link";
import { obligations } from "@/lib/dpdp-sections";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-14 border-b border-rule pb-10">
          <p className="font-sans text-sm text-amber tracking-wide mb-4">
            Digital Personal Data Protection Act, 2023
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold leading-[1.15] mb-5 max-w-2xl">
            Find out where your product stands with the DPDP Act.
          </h1>
          <p className="font-sans text-base text-slate max-w-prose leading-relaxed">
            Answer a guided questionnaire across the Act's ten core obligations, or upload
            your privacy policy for a review against the statute. Either path
            ends in the same place: a clause-by-clause report of what to fix, and in what order.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-5 mb-16">
          <Link
            href="/questionnaire"
            className="group block border border-rule rounded-lg p-6 bg-white/40 hover:bg-white hover:border-ink transition-colors"
          >
            <p className="font-sans text-xs text-slate mb-2">Path one · ~10 minutes</p>
            <h2 className="font-serif text-xl font-semibold mb-2">Run the questionnaire</h2>
            <p className="font-sans text-sm text-slate leading-relaxed mb-4">
              Twenty questions across notice, consent, children's data, breach response,
              retention, and more. Best if you know your own systems well.
            </p>
            <span className="font-sans text-sm text-ink group-hover:text-amber transition-colors">
              Start assessment &rarr;
            </span>
          </Link>

          <Link
            href="/analyze"
            className="group block border border-rule rounded-lg p-6 bg-white/40 hover:bg-white hover:border-ink transition-colors"
          >
            <p className="font-sans text-xs text-slate mb-2">Path two · instant</p>
            <h2 className="font-serif text-xl font-semibold mb-2">Scan a privacy policy</h2>
            <p className="font-sans text-sm text-slate leading-relaxed mb-4">
              Paste or upload an existing privacy policy or consent notice. It is checked
              against the Act and missing or weak clauses are flagged. Works without any API key.
            </p>
            <span className="font-sans text-sm text-ink group-hover:text-amber transition-colors">
              Upload document &rarr;
            </span>
          </Link>
        </div>

        <section>
          <h3 className="font-serif text-lg font-semibold mb-5">What gets checked</h3>
          <ol className="border-t border-rule">
            {obligations.map((ob, i) => (
              <li key={ob.id} className="flex gap-5 py-4 border-b border-rule">
                <span className="clause-number font-serif text-slate text-sm w-6 pt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-sans text-sm font-medium">
                    {ob.title}{" "}
                    <span className="text-slate font-normal">— {ob.actReference}</span>
                  </p>
                  <p className="font-sans text-sm text-slate mt-1 leading-relaxed max-w-prose">
                    {ob.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-16 pt-6 border-t border-rule">
          <p className="font-sans text-xs text-slate leading-relaxed max-w-prose">
            This tool gives a directional gap assessment for engineering and product teams.
            It is not legal advice, and does not replace review by a qualified privacy counsel
            or the Data Protection Board's own guidance.
          </p>
        </footer>
      </div>
    </main>
  );
}
