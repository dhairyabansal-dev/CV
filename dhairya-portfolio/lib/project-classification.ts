import type { GitHubProject, ProjectClassification } from "@/types/github";

/**
 * Manual presentation metadata, keyed by GitHub repository name
 * (case-insensitive). This is the ONLY place project ticker/category/
 * featured-state should be hand-edited — everything else (description,
 * language, links, timestamps) comes from the GitHub API at request time.
 *
 * A repo with no entry here still appears in the portfolio; it just gets
 * a generated ticker/category (see `lib/github.ts`).
 */
export const projectClassifications: Record<string, ProjectClassification> = {
  "roy---os": {
    aliases: ["roy-os", "royos"],
    ticker: "ROY",
    title: "Roy OS",
    category: "AI / Software Systems",
    priority: 1,
    featured: true,
  },
  "monte-carlo-risk": {
    aliases: ["monte-carlo-risk-engine"],
    ticker: "MCR",
    title: "Monte Carlo Risk Engine",
    category: "Quantitative Finance",
    priority: 2,
    featured: true,
  },
  "black-school-model": {
    aliases: ["black-scholes-model", "black-scholes-merton-model"],
    ticker: "BSM",
    title: "Black-Scholes-Merton Model",
    category: "Quantitative Finance",
    priority: 3,
    featured: true,
  },
  "ethereum-tracker": {
    ticker: "ETH",
    title: "Ethereum Tracker",
    category: "Blockchain",
    priority: 4,
    featured: true,
  },
  credify: {
    ticker: "CRD",
    title: "CrediFy",
    category: "FinTech",
    priority: 5,
    featured: true,
  },
  "financial-data-warehouse": {
    ticker: "FDW",
    title: "Financial Data Warehouse",
    category: "Data Engineering",
    priority: 6,
  },
  "delivery-app-variables": {
    aliases: ["delivery-app-variables-zip"],
    ticker: "VAL",
    title: "Delivery-App-Variables",
    category: "Financial Modelling / Valuation",
    priority: 7,
  },
  // The portfolio's own source repo shouldn't list itself as a project.
  cv: { hidden: true },
};

/**
 * Reverse lookup: repo name (or alias), lowercased -> classification.
 * Built once at module load.
 */
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
 * Shown only if the live GitHub fetch fails outright (rate limit, network
 * error, GitHub outage). Keeps the Projects section from going blank.
 * Intentionally small — just enough to keep the section credible until
 * GitHub is reachable again on the next revalidation.
 */
export const fallbackProjects: GitHubProject[] = [
  {
    id: -1,
    repoName: "Roy---OS",
    ticker: "ROY",
    title: "Roy OS",
    description:
      "A local-first AI planning and scheduling system that turns natural-language input into structured tasks, priorities, and schedules.",
    category: "AI / Software Systems",
    language: "Python",
    topics: [],
    githubUrl: "https://github.com/dhairyabansal-dev/Roy---OS",
    demoUrl: null,
    updatedAt: "",
    pushedAt: "",
    stars: 0,
    featured: true,
    source: "fallback",
  },
  {
    id: -2,
    repoName: "Monte-Carlo-Risk",
    ticker: "MCR",
    title: "Monte Carlo Risk Engine",
    description:
      "A quantitative finance engine that uses Monte Carlo simulation to model probabilistic financial outcomes and support risk analysis.",
    category: "Quantitative Finance",
    language: "Python",
    topics: [],
    githubUrl: "https://github.com/dhairyabansal-dev/Monte-Carlo-Risk",
    demoUrl: null,
    updatedAt: "",
    pushedAt: "",
    stars: 0,
    featured: true,
    source: "fallback",
  },
  {
    id: -3,
    repoName: "Black-School-Model",
    ticker: "BSM",
    title: "Black-Scholes-Merton Model",
    description: "A Python implementation of the Black-Scholes-Merton options pricing model.",
    category: "Quantitative Finance",
    language: "Python",
    topics: [],
    githubUrl: "https://github.com/dhairyabansal-dev/Black-School-Model",
    demoUrl: null,
    updatedAt: "",
    pushedAt: "",
    stars: 0,
    featured: true,
    source: "fallback",
  },
  {
    id: -4,
    repoName: "Ethereum-Tracker",
    ticker: "ETH",
    title: "Ethereum Tracker",
    description:
      "A blockchain analytics project focused on exploring Ethereum transaction data and on-chain activity.",
    category: "Blockchain",
    language: "Python",
    topics: [],
    githubUrl: "https://github.com/dhairyabansal-dev/Ethereum-Tracker",
    demoUrl: null,
    updatedAt: "",
    pushedAt: "",
    stars: 0,
    featured: true,
    source: "fallback",
  },
  {
    id: -5,
    repoName: "Credify",
    ticker: "CRD",
    title: "CrediFy",
    description: "A FinTech decision system focused on financial and credit analysis logic.",
    category: "FinTech",
    language: null,
    topics: [],
    githubUrl: "https://github.com/dhairyabansal-dev/Credify",
    demoUrl: null,
    updatedAt: "",
    pushedAt: "",
    stars: 0,
    featured: true,
    source: "fallback",
  },
];
