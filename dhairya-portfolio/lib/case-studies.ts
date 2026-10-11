export interface CaseStudySection {
  title: string;
  summary: string;
  bullets: string[];
}

export interface CaseStudy {
  slug: string;
  code: string;
  title: string;
  category: string;
  status: string;
  summary: string;
  overview: string;
  stack: string[];
  flow: string[];
  sections: CaseStudySection[];
  note: string;
}

/**
 * Public-safe summaries of selected private projects.
 * Keep credentials, private endpoints, internal security controls, customer data,
 * proprietary source code, and unverified performance claims out of this file.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "roy-quant-store",
    code: "RQS",
    title: "ROY Quant Store",
    category: "FinTech / Commerce Systems",
    status: "In development",
    summary:
      "A commerce platform for digital quantitative products, designed around verified checkout, payment events, subscriptions, and controlled product entitlements.",
    overview:
      "ROY Quant Store explores the engineering behind selling digital financial tools safely. Rather than treating a successful checkout as the whole transaction, the system separates orders, payment verification, subscription state, and the entitlement decision that governs product access.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Vitest", "Zod"],
    flow: [
      "Product catalogue",
      "Checkout and payment provider",
      "Verified payment event",
      "Order and subscription state",
      "Entitlement decision",
      "Access operations",
    ],
    sections: [
      {
        title: "The problem",
        summary:
          "Digital products need more than a storefront. Payment state, customer access, renewals, and failed or repeated webhook events must remain consistent.",
        bullets: [
          "Keep server-side pricing and order state authoritative.",
          "Treat provider webhooks as events to validate, not as trusted browser input.",
          "Separate payment status from the decision to grant product access.",
        ],
      },
      {
        title: "System design",
        summary:
          "The repository is organized around a Next.js application, a PostgreSQL data model managed through Prisma, provider abstractions, and a dedicated entitlement workflow.",
        bullets: [
          "Checkout and payment-provider integration points.",
          "Webhook validation and idempotent event handling.",
          "Subscription lifecycle and entitlement checks.",
          "An operational queue for access actions that require provider-side handling.",
        ],
      },
      {
        title: "Engineering focus",
        summary:
          "The central design question is how to make commerce state explicit and auditable across multiple services.",
        bullets: [
          "Fail-closed access decisions.",
          "Server-side authorization and secret handling.",
          "Testable business logic around payments and entitlements.",
        ],
      },
    ],
    note:
      "The source repository is private. This page intentionally documents the product and high-level design without publishing implementation details, credentials, or provider secrets. Payment-provider and access-delivery readiness should be confirmed before describing the product as live.",
  },
  {
    slug: "forecast",
    code: "FCAST",
    title: "Forecast",
    category: "Cybersecurity / AI Systems",
    status: "Research / in development",
    summary:
      "A cybersecurity threat-intelligence and forecasting platform combining network telemetry, anomaly detection, temporal risk forecasts, analyst workflows, and integrity-focused evidence handling.",
    overview:
      "Forecast is a full-stack project developed for a Smart India Hackathon concept. It explores how security telemetry can be transformed into a structured network state, analyzed for anomalies, used to estimate future risk, and presented to an analyst with traceable evidence.",
    stack: [
      "React",
      "Vite",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "PyTorch",
      "scikit-learn",
      "Solidity / EVM",
    ],
    flow: [
      "Security telemetry",
      "Feature extraction",
      "Network state and anomaly analysis",
      "Temporal risk forecasting",
      "Threat intelligence correlation",
      "Analyst dashboard and evidence review",
    ],
    sections: [
      {
        title: "The problem",
        summary:
          "Security teams can be overwhelmed by raw events. This project explores combining detection, temporal context, and investigation workflows instead of presenting isolated alerts alone.",
        bullets: [
          "Structure network observations into analyzable features.",
          "Surface anomalous activity and correlated threat context.",
          "Present current signals alongside experimental future-risk estimates.",
        ],
      },
      {
        title: "System design",
        summary:
          "The repository separates the analyst interface, API services, machine-learning components, persistence, and blockchain-based evidence-integrity experiments.",
        bullets: [
          "A React/Vite dashboard backed by a Python FastAPI service.",
          "Anomaly detection and temporal forecasting components.",
          "Database-backed threat, anomaly, forecast, and audit records.",
          "A local EVM-based proof-of-concept for anchoring and verifying evidence hashes.",
        ],
      },
      {
        title: "Validation matters",
        summary:
          "Forecasting and anomaly scores are decision-support signals, not proof that an attack has occurred. Model quality and operational usefulness must be measured against suitable data and baselines.",
        bullets: [
          "Document data sources, assumptions, and known limitations.",
          "Evaluate false positives, false negatives, and forecast error.",
          "Keep human investigation in the response loop.",
        ],
      },
    ],
    note:
      "The repository is private. This overview omits credentials, private endpoints, deployment secrets, and sensitive operational configuration. The project is presented as a development/research system, not as a certified or production-validated security product.",
  },
  {
    slug: "campus-social",
    code: "CAMP",
    title: "Campus Social",
    category: "Full-stack / Mobile Systems",
    status: "In development",
    summary:
      "A campus-focused social product exploring verified membership, discovery, matching, messaging, and moderation across web and mobile clients.",
    overview:
      "Campus Social is a multi-client product project organized around shared types and validation, a web application, a native mobile application, API services, and administrative tooling.",
    stack: [
      "Next.js",
      "TypeScript",
      "Expo / React Native",
      "FastAPI",
      "Shared packages",
      "Database migrations",
    ],
    flow: [
      "Account and campus verification",
      "Discovery and preferences",
      "Mutual match",
      "Match-based conversation",
      "Reporting and moderation",
    ],
    sections: [
      {
        title: "Product architecture",
        summary:
          "The project separates the user-facing clients from API and moderation surfaces, with shared packages intended to reduce duplicated contracts across applications.",
        bullets: [
          "Web and mobile client applications.",
          "A dedicated API layer.",
          "Shared UI, types, validation, and configuration packages.",
          "Administrative and moderation workflows.",
        ],
      },
      {
        title: "Trust and safety",
        summary:
          "A campus-focused social product needs clear identity, age, privacy, and interaction rules as part of its product design rather than as afterthoughts.",
        bullets: [
          "Verification and onboarding rules.",
          "Match-based messaging and user controls.",
          "Blocking, reporting, and moderation considerations.",
        ],
      },
    ],
    note:
      "The source repository is private. This page provides a high-level product and architecture summary only; it does not expose user data, internal endpoints, credentials, or private implementation details.",
  },
];
