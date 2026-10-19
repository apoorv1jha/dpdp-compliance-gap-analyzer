import { Obligation } from "./types";

// Question bank mapped to Digital Personal Data Protection Act, 2023 obligations.
// Each answer option carries a 0-3 score (0 = non-compliant, 3 = fully compliant).

export const obligations: Obligation[] = [
  {
    id: "notice",
    title: "Notice to Data Principals",
    actReference: "Section 5",
    description:
      "Before or at the time of seeking consent, a Data Fiduciary must give an itemised notice describing the personal data collected and the purpose of processing.",
    questions: [
      {
        id: "notice-1",
        clause: "Section 5(1)",
        prompt: "Do you show a standalone privacy notice before collecting personal data, separate from general terms of service?",
        options: [
          { id: "a", label: "Yes, a dedicated itemised notice with purpose and data fields listed", score: 3 },
          { id: "b", label: "A privacy policy exists but is buried inside terms of service", score: 1 },
          { id: "c", label: "We only mention data use vaguely, no dedicated notice", score: 0 },
          { id: "d", label: "Not sure / never reviewed this", score: 0 },
        ],
      },
      {
        id: "notice-2",
        clause: "Section 5(2)",
        prompt: "Can users read the notice in a language they choose, and does it explain how to withdraw consent or file a complaint?",
        options: [
          { id: "a", label: "Yes, multi-language support plus clear withdrawal/complaint instructions", score: 3 },
          { id: "b", label: "English only, but withdrawal instructions are present", score: 2 },
          { id: "c", label: "English only, no withdrawal or complaint instructions", score: 1 },
          { id: "d", label: "No such information provided", score: 0 },
        ],
      },
    ],
  },
  {
    id: "consent",
    title: "Consent Standards",
    actReference: "Section 6",
    description:
      "Consent must be free, specific, informed, unconditional, unambiguous, and limited to the purpose stated. Withdrawal must be as easy as giving it.",
    questions: [
      {
        id: "consent-1",
        clause: "Section 6(1)",
        prompt: "Is consent collected via a clear affirmative action (checkbox/toggle) rather than pre-ticked boxes or implied consent?",
        options: [
          { id: "a", label: "Yes, unticked opt-in checkboxes for each distinct purpose", score: 3 },
          { id: "b", label: "One bundled checkbox covers all purposes together", score: 1 },
          { id: "c", label: "Pre-ticked or bundled with account creation, no separate action", score: 0 },
        ],
      },
      {
        id: "consent-2",
        clause: "Section 6(4)",
        prompt: "Can a user withdraw consent through a mechanism as simple as the one used to give it?",
        options: [
          { id: "a", label: "Yes, one-click withdrawal in account settings", score: 3 },
          { id: "b", label: "Withdrawal requires emailing support or filling a form", score: 1 },
          { id: "c", label: "No withdrawal mechanism exists", score: 0 },
        ],
      },
    ],
  },
  {
    id: "children",
    title: "Processing of Children's Data",
    actReference: "Section 9",
    description:
      "Processing personal data of a child (under 18) requires verifiable parental consent, and behavioural tracking or targeted ads to children are prohibited.",
    questions: [
      {
        id: "children-1",
        clause: "Section 9(1)",
        prompt: "If your product could be used by minors, do you obtain verifiable parental/guardian consent before processing a child's data?",
        options: [
          { id: "a", label: "Yes, verifiable consent flow exists (age-gate plus guardian verification)", score: 3 },
          { id: "b", label: "Simple self-declared age checkbox only", score: 1 },
          { id: "c", label: "No age verification or parental consent mechanism", score: 0 },
          { id: "d", label: "Not applicable, service is strictly for adults with hard verification", score: 3 },
        ],
      },
      {
        id: "children-2",
        clause: "Section 9(3)",
        prompt: "Do you avoid behavioural monitoring, tracking, or targeted advertising directed at children?",
        options: [
          { id: "a", label: "Yes, tracking and ad targeting are disabled for accounts flagged as minors", score: 3 },
          { id: "b", label: "Partially, analytics still track minors but no ad targeting", score: 1 },
          { id: "c", label: "No distinction made, all users are tracked and targeted the same way", score: 0 },
        ],
      },
    ],
  },
  {
    id: "security",
    title: "Security Safeguards",
    actReference: "Section 8(5)",
    description:
      "A Data Fiduciary must implement reasonable security safeguards to prevent personal data breach, including encryption and access control.",
    questions: [
      {
        id: "security-1",
        clause: "Section 8(5)",
        prompt: "Is personal data encrypted at rest and in transit, with access restricted on a need-to-know basis?",
        options: [
          { id: "a", label: "Yes, encryption at rest and in transit, plus role-based access control", score: 3 },
          { id: "b", label: "Encryption in transit only (HTTPS), no encryption at rest", score: 1 },
          { id: "c", label: "No systematic encryption or access control policy", score: 0 },
        ],
      },
      {
        id: "security-2",
        clause: "Section 8(5)",
        prompt: "Do you run periodic security audits, vulnerability scans, or penetration tests on systems handling personal data?",
        options: [
          { id: "a", label: "Yes, on a regular scheduled basis with documented findings", score: 3 },
          { id: "b", label: "Occasionally, ad hoc, no fixed schedule", score: 1 },
          { id: "c", label: "Never performed", score: 0 },
        ],
      },
    ],
  },
  {
    id: "breach",
    title: "Personal Data Breach Notification",
    actReference: "Section 8(6)",
    description:
      "On becoming aware of a breach, the Data Fiduciary must notify the Data Protection Board and each affected Data Principal, in the form and manner prescribed.",
    questions: [
      {
        id: "breach-1",
        clause: "Section 8(6)",
        prompt: "Do you have a documented incident response plan defining who is notified and within what timeline after a breach is detected?",
        options: [
          { id: "a", label: "Yes, a written plan with defined roles and notification timelines", score: 3 },
          { id: "b", label: "Informal plan exists only in people's heads, nothing documented", score: 1 },
          { id: "c", label: "No incident response plan at all", score: 0 },
        ],
      },
      {
        id: "breach-2",
        clause: "Section 8(6)",
        prompt: "Would you be able to notify affected users and the Data Protection Board without undue delay if a breach occurred today?",
        options: [
          { id: "a", label: "Yes, notification templates and contact lists are ready", score: 3 },
          { id: "b", label: "We would improvise a process reactively", score: 1 },
          { id: "c", label: "We have no way to identify who was affected", score: 0 },
        ],
      },
    ],
  },
  {
    id: "retention",
    title: "Storage Limitation & Erasure",
    actReference: "Section 8(7) / Section 8(8)",
    description:
      "Personal data must be erased once the purpose is served and retention is no longer necessary for legal compliance, unless retention is otherwise required by law.",
    questions: [
      {
        id: "retention-1",
        clause: "Section 8(7)",
        prompt: "Do you have defined retention periods per data category, after which data is automatically deleted or anonymised?",
        options: [
          { id: "a", label: "Yes, documented retention schedule with automated deletion", score: 3 },
          { id: "b", label: "Retention periods are defined but deletion is manual and inconsistent", score: 1 },
          { id: "c", label: "Data is kept indefinitely with no retention policy", score: 0 },
        ],
      },
      {
        id: "retention-2",
        clause: "Section 8(8)",
        prompt: "When a user closes their account, is their personal data erased (subject to legal retention exceptions)?",
        options: [
          { id: "a", label: "Yes, erasure runs automatically with only legally-mandated data retained", score: 3 },
          { id: "b", label: "Account is deactivated but data is retained indefinitely without review", score: 1 },
          { id: "c", label: "No erasure process on account closure", score: 0 },
        ],
      },
    ],
  },
  {
    id: "rights",
    title: "Data Principal Rights",
    actReference: "Sections 11-14",
    description:
      "Data Principals have the right to obtain a summary of processing, correction and erasure of data, grievance redressal, and nomination of another person in case of death or incapacity.",
    questions: [
      {
        id: "rights-1",
        clause: "Section 11-12",
        prompt: "Can users request a summary of what personal data you hold about them, and request corrections?",
        options: [
          { id: "a", label: "Yes, self-service export and edit options in account settings", score: 3 },
          { id: "b", label: "Only via a manual support request with unclear turnaround time", score: 1 },
          { id: "c", label: "No mechanism exists", score: 0 },
        ],
      },
      {
        id: "rights-2",
        clause: "Section 13",
        prompt: "Do you have a published grievance redressal process with a named contact and a response timeline?",
        options: [
          { id: "a", label: "Yes, published grievance officer/contact and committed response SLA", score: 3 },
          { id: "b", label: "A generic support email exists but no defined SLA or named contact", score: 1 },
          { id: "c", label: "No grievance mechanism published", score: 0 },
        ],
      },
    ],
  },
  {
    id: "cross-border",
    title: "Cross-Border Data Transfer",
    actReference: "Section 16",
    description:
      "The Central Government may restrict transfer of personal data to certain countries or territories notified by it; transfers must comply with any such restrictions.",
    questions: [
      {
        id: "cross-1",
        clause: "Section 16",
        prompt: "Do you maintain a record of which countries your personal data is stored in or transferred to (e.g. cloud regions, subprocessors)?",
        options: [
          { id: "a", label: "Yes, a maintained data-flow map across all vendors and regions", score: 3 },
          { id: "b", label: "We know our primary cloud region but not all subprocessors", score: 1 },
          { id: "c", label: "No visibility into where data physically resides", score: 0 },
        ],
      },
      {
        id: "cross-2",
        clause: "Section 16",
        prompt: "Do you monitor for government notifications restricting transfer to specific countries and adjust vendor/hosting choices accordingly?",
        options: [
          { id: "a", label: "Yes, this is part of a compliance review cycle", score: 3 },
          { id: "b", label: "We would react only if directly notified of a violation", score: 1 },
          { id: "c", label: "We do not track this at all", score: 0 },
        ],
      },
    ],
  },
  {
    id: "sdf",
    title: "Significant Data Fiduciary Obligations",
    actReference: "Section 10",
    description:
      "If notified as a Significant Data Fiduciary, additional duties apply: appointing a Data Protection Officer, an independent data auditor, and periodic Data Protection Impact Assessments.",
    questions: [
      {
        id: "sdf-1",
        clause: "Section 10(2)(a)",
        prompt: "Given your scale/data sensitivity, have you assessed whether you may be classified a Significant Data Fiduciary, and if so appointed a DPO based in India?",
        options: [
          { id: "a", label: "Yes, assessed and a DPO is appointed / not applicable at current scale", score: 3 },
          { id: "b", label: "Not formally assessed, no DPO appointed", score: 1 },
          { id: "c", label: "Never considered this", score: 0 },
        ],
      },
      {
        id: "sdf-2",
        clause: "Section 10(2)(c)",
        prompt: "Do you conduct Data Protection Impact Assessments (DPIA) before launching features that process sensitive personal data at scale?",
        options: [
          { id: "a", label: "Yes, DPIA is a standard step in the feature launch checklist", score: 3 },
          { id: "b", label: "Done occasionally for major launches only", score: 1 },
          { id: "c", label: "Never performed", score: 0 },
        ],
      },
    ],
  },
  {
    id: "accuracy",
    title: "Accuracy & Purpose Limitation",
    actReference: "Section 8(3) / Section 8(1)",
    description:
      "Personal data processed must be complete, accurate, and consistent, and processing must be limited to the purpose for which consent was given.",
    questions: [
      {
        id: "accuracy-1",
        clause: "Section 8(1)",
        prompt: "Is personal data collected for one purpose ever reused for a different, unrelated purpose (e.g. marketing) without fresh consent?",
        options: [
          { id: "a", label: "No, purpose-limited use is enforced and reuse requires new consent", score: 3 },
          { id: "b", label: "Sometimes reused internally without asking again", score: 1 },
          { id: "c", label: "Data is freely reused across teams/products without restriction", score: 0 },
        ],
      },
      {
        id: "accuracy-2",
        clause: "Section 8(3)",
        prompt: "Do you have a process for keeping personal data accurate and up to date, especially data used for decisions affecting the user?",
        options: [
          { id: "a", label: "Yes, users can self-correct and we periodically validate key fields", score: 3 },
          { id: "b", label: "Users can correct data but we never proactively validate it", score: 1 },
          { id: "c", label: "No process exists", score: 0 },
        ],
      },
    ],
  },
];

export const maxScorePerQuestion = 3;
