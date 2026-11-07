import type { GitHubProject, ProjectClassification } from "@/types/github";

/**
 * Curated presentation metadata for public GitHub repositories.
 * Finance and analytical projects are deliberately ranked first;
 * general software and cybersecurity experiments remain secondary.
 */
export const projectClassifications: Record<string, ProjectClassification> = {
  credify: {
    ticker: "CRD",
    title: "CrediFy — Loan Eligibility & EMI Analysis",
    description:
      "A rule-based digital lending case study: evaluate applicant eligibility using age, credit score and FOIR; apply credit-tier interest rates; calculate EMI; and review a sample loan portfolio through a Streamlit dashboard. The README documents six sample applicants and the model's assumptions and limitations.",
    category: "Digital Lending & Credit Analytics",
    priority: 1,
    featured: true,
  },
  "financial-data-warehouse": {
    ticker: "FDW",
    title: "Financial Data Warehouse",
    description:
      "A Python ETL project for collecting, validating, transforming and storing financial data, with structured outputs for downstream analysis and reporting. The repository documents Excel, CSV and Power BI export paths.",
    category: "Financial Data & Business Analytics",
    priority: 2,
    featured: true,
  },
  quantedge: {
    ticker: "QED",
    title: "QuantEdge — Backtesting & Risk Analytics",
    description:
      "A quantitative research toolkit with lagged signal execution, fee and slippage modelling, benchmark comparison, and performance and downside-risk metrics including CAGR, Sharpe, Sortino, drawdown, VaR and CVaR.",
    category: "Quantitative Research & Risk Analytics",
    priority: 3,
    featured: true,
  },
  "monte-carlo-risk": {
    aliases: ["monte-carlo-risk-engine"],
    ticker: "MCR",
    title: "Monte Carlo Risk Engine",
    category: "Quantitative Finance",
    priority: 4,
    featured: false,
  },
  "volatility-surface-engine": {
    ticker: "VOL",
    title: "Volatility Surface Engine",
    category: "Options Analytics",
    priority: 5,
    featured: false,
  },
  "market-microstructure-engine": {
    ticker: "MME",
    title: "Market Microstructure Engine",
    category: "Market Analytics",
    priority: 6,
    featured: false,
  },
  "black-school-model": {
    aliases: ["black-scholes-model", "black-scholes-merton-model"],
    ticker: "BSM",
    title: "Black-Scholes-Merton Model",
    category: "Quantitative Finance",
    priority: 7,
    featured: false,
  },
  "roy---os": {
    aliases: ["roy-os", "royos"],
    ticker: "ROY",
    title: "Roy OS",
    description: "A local-first AI planning and scheduling system. Presented as a secondary software engineering project.",
    category: "AI / Software Systems",
    priority: 20,
    featured: false,
  },
  "ethereum-tracker": {
    ticker: "ETH",
    title: "Ethereum Tracker",
    category: "Blockchain Analytics",
    priority: 21,
    featured: false,
  },
  "delivery-app-variables": {
    hidden: true,
  },
  "chatbot-1": {
    hidden: true,
  },
  forecast: {
    ticker: "FCT",
    title: "Forecast — Cybersecurity Threat Intelligence",
    category: "Cybersecurity / Hackathon",
    priority: 30,
    featured: false,
  },
  cv: { hidden: true },
};

/** Reverse lookup: repository name (or alias), lowercased -> classification. */
const classificationByName = new Map<string, ProjectClassification>();
for (const [key, classification] of Object.entries(projectClassifications)) {
  classificationByName.set(key.toLowerCase(), classification);
  for (const alias of classification.aliases ?? []) {
    classificationByName.set(alias.toLowerCase(), classification);
  }
}

export function findClassification(
  repoName: string,
): ProjectClassification | undefined {
  return classificationByName.get(repoName.toLowerCase());
}

/**
 * Static fallback used only when the live GitHub API is unavailable.
 * Keep the same finance-first ordering as the live repository feed.
 */
export const fallbackProjects: GitHubProject[] = [
  {
    id: -1,
    repoName: "Credify",
    ticker: "CRD",
    title: "CrediFy — Loan Eligibility & EMI Analysis",
    description:
      "A rule-based digital lending case study covering age, credit score, FOIR, credit-tier interest rates, EMI calculations and a Streamlit dashboard. It uses sample applicants and explicitly documents its assumptions and limitations.",
    category: "Digital Lending & Credit Analytics",
    language: "Python",
    topics: [],
    githubUrl: "https://github.com/dhairyabansal-dev/Credify",
    demoUrl: null,
    updatedAt: "",
    pushedAt: "",
    stars: 0,
    featured: true,
    source: "fallback",
  },
  {
    id: -2,
    repoName: "Financial-Data-Warehouse",
    ticker: "FDW",
    title: "Financial Data Warehouse",
    description:
      "A Python ETL project for collecting, validating, transforming and storing structured financial data for downstream analysis and reporting.",
    category: "Financial Data & Business Analytics",
    language: "Python",
    topics: [],
    githubUrl: "https://github.com/dhairyabansal-dev/Financial-Data-Warehouse",
    demoUrl: null,
    updatedAt: "",
    pushedAt: "",
    stars: 0,
    featured: true,
    source: "fallback",
  },
  {
    id: -3,
    repoName: "QuantEdge",
    ticker: "QED",
    title: "QuantEdge — Backtesting & Risk Analytics",
    description:
      "A quantitative research toolkit for lagged backtesting, trading-cost-aware returns, benchmark comparison and downside-risk metrics.",
    category: "Quantitative Research & Risk Analytics",
    language: "Python",
    topics: [],
    githubUrl: "https://github.com/dhairyabansal-dev/QuantEdge",
    demoUrl: null,
    updatedAt: "",
    pushedAt: "",
    stars: 0,
    featured: true,
    source: "fallback",
  },
];
