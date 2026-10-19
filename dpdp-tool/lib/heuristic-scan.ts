import { DocumentAnalysis, DocumentFinding, RiskLevel } from "./types";

// Rule-based scanner: works with zero API keys. Checks whether a policy
// mentions the elements the DPDP Act expects. Less nuanced than the LLM scan,
// but free, instant and fully offline.

interface Rule {
  clause: string;
  severity: RiskLevel;
  patterns: RegExp[]; // at least one must match for the rule to pass
  issue: string;
  recommendation: string;
}

const rules: Rule[] = [
  {
    clause: "Section 5 - Notice (purpose and data categories)",
    severity: "high",
    patterns: [/purpose/i, /we collect/i, /categories of (personal )?data/i],
    issue: "The policy does not clearly list what personal data is collected and for which purpose.",
    recommendation: "Add an itemised notice: each data field collected, mapped to the specific purpose it is used for.",
  },
  {
    clause: "Section 6 - Consent",
    severity: "high",
    patterns: [/\bconsent\b/i, /\bagree\b/i, /opt[- ]in/i],
    issue: "No clear statement on how consent is obtained.",
    recommendation: "State that consent is collected through a clear affirmative action, separately for each purpose.",
  },
  {
    clause: "Section 6(4) - Withdrawal of consent",
    severity: "high",
    patterns: [/withdraw/i, /revoke/i, /opt[- ]out/i, /unsubscribe/i],
    issue: "No mechanism to withdraw consent is described.",
    recommendation: "Describe a withdrawal method that is as easy as giving consent, for example a toggle in account settings.",
  },
  {
    clause: "Section 8(5) - Security safeguards",
    severity: "medium",
    patterns: [/encrypt/i, /security (measures|safeguards)/i, /access control/i, /secure/i],
    issue: "Security safeguards are not mentioned.",
    recommendation: "Mention concrete safeguards such as encryption in transit and at rest, and role-based access control.",
  },
  {
    clause: "Section 8(6) - Breach notification",
    severity: "medium",
    patterns: [/breach/i, /data incident/i, /notify (you|users|affected)/i],
    issue: "Nothing is said about notifying users or the Data Protection Board after a breach.",
    recommendation: "Add a line committing to notify affected users and the Board when a personal data breach occurs.",
  },
  {
    clause: "Section 8(7) - Retention and erasure",
    severity: "medium",
    patterns: [/retain/i, /retention/i, /delete/i, /erase/i, /erasure/i],
    issue: "No retention period or erasure policy is stated.",
    recommendation: "State how long each data category is kept and that data is erased once the purpose is served.",
  },
  {
    clause: "Section 9 - Children's data",
    severity: "medium",
    patterns: [/child/i, /minor/i, /under (the age of )?18/i, /parent/i, /guardian/i],
    issue: "The policy does not address children's data or parental consent.",
    recommendation: "State whether minors can use the service and, if so, that verifiable parental consent is obtained.",
  },
  {
    clause: "Sections 11-12 - Access and correction rights",
    severity: "medium",
    patterns: [/right to (access|correct)/i, /access (your|the) (personal )?data/i, /correct(ion)?/i, /update your/i],
    issue: "Data Principal rights to access and correct data are not described.",
    recommendation: "List the right to request a summary of data held and to correct inaccurate data, and how to exercise it.",
  },
  {
    clause: "Section 13 - Grievance redressal",
    severity: "high",
    patterns: [/grievance/i, /complaint/i, /data protection officer/i, /\bDPO\b/i, /contact us/i],
    issue: "No grievance redressal contact is published.",
    recommendation: "Name a grievance officer or contact email and commit to a response timeline.",
  },
  {
    clause: "Section 14 - Right to nominate",
    severity: "low",
    patterns: [/nominate/i, /nominee/i],
    issue: "The right to nominate another person in case of death or incapacity is not mentioned.",
    recommendation: "Add a short clause explaining how a user can nominate a representative.",
  },
  {
    clause: "Section 16 - Cross-border transfer",
    severity: "low",
    patterns: [/outside india/i, /cross[- ]border/i, /international transfer/i, /servers? (located )?in/i, /third countr/i],
    issue: "No disclosure on where data is stored or transferred internationally.",
    recommendation: "Disclose the regions where data is stored and any overseas processors or vendors.",
  },
];

const order: Record<string, number> = { high: 0, medium: 1, low: 2 };

export function heuristicScan(text: string): DocumentAnalysis {
  const findings: DocumentFinding[] = rules
    .filter((r) => !r.patterns.some((p) => p.test(text)))
    .map((r) => ({
      clause: r.clause,
      issue: r.issue,
      severity: r.severity,
      recommendation: r.recommendation,
    }))
    .sort((a, b) => order[a.severity] - order[b.severity]);

  const passed = rules.length - findings.length;
  const highCount = findings.filter((f) => f.severity === "high").length;

  let overallRisk: RiskLevel = "compliant";
  if (highCount >= 2 || findings.length >= 7) overallRisk = "high";
  else if (highCount === 1 || findings.length >= 4) overallRisk = "medium";
  else if (findings.length >= 1) overallRisk = "low";

  return {
    summary: `Keyword scan: ${passed} of ${rules.length} expected DPDP elements are mentioned in the document, and ${findings.length} appear to be missing. This is a presence check only; it cannot judge whether a clause is well written. Add a free Groq API key for a deeper review.`,
    overallRisk,
    findings,
  };
}
