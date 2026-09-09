import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  owner: {
    name: "Dhairya Bansal",
    title: "FinTech & Quant Systems Builder",
    heroDescription:
      "I build systems at the intersection of finance, quantitative analysis, and software engineering.",
    supportingDescription:
      "From quantitative financial models and market analytics to AI-powered applications and backend systems, I learn by building and work through complex problems independently.",
  },
  contact: {
    email: "dhairyabansal090@gmail.com",
    phone: "9455198168",
    github: "https://github.com/dhairyabansal01-bit",
    linkedin: "https://www.linkedin.com/in/dhairya-bansal-9044b9358/",
  },
  navigation: [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Projects", href: "#projects" },
    { label: "Building", href: "#currently-building" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  capabilities: [
    {
      title: "Finance & Quant",
      capabilities: [
        "Financial Modelling",
        "Monte Carlo Simulation",
        "Black-Scholes Modelling",
        "DCF Analysis",
        "Market Analytics",
      ],
    },
    {
      title: "Software Engineering",
      capabilities: [
        "Python",
        "Backend Systems",
        "APIs",
        "Databases",
        "System Design & Architecture",
      ],
    },
    {
      title: "Data & Intelligent Systems",
      capabilities: ["Data Processing", "Automation", "AI / LLM Systems"],
    },
    {
      title: "FinTech & Blockchain",
      capabilities: [
        "Blockchain Analytics",
        "Transaction Analysis",
        "Financial Decision Systems",
      ],
    },
  ],
  projects: [
    {
      name: "Roy OS",
      ticker: "ROY",
      description:
        "A local-first AI planning and scheduling system that turns natural-language input into structured tasks, priorities, and schedules.",
      highlights: [
        "AI systems",
        "Planning architecture",
        "Scheduling engine",
        "Priority engine",
        "Local-first architecture",
      ],
      technologies: ["AI / LLM", "Python", "Scheduling", "Local-first"],
      githubUrl: null,
      demoUrl: null,
    },
    {
      name: "Blockchain Forensics",
      ticker: "BCF",
      description:
        "A blockchain investigation and analytics platform for transaction analysis, on-chain data, and financial technology workflows.",
      highlights: [
        "Blockchain analytics",
        "APIs",
        "Data systems",
        "Transaction analysis",
      ],
      technologies: ["Blockchain", "APIs", "Data Systems"],
      githubUrl: null,
      demoUrl: null,
    },
    {
      name: "Monte Carlo Risk Engine",
      ticker: "MCR",
      description:
        "A quantitative finance engine that uses Monte Carlo simulation to model probabilistic financial outcomes and support risk analysis.",
      highlights: ["Python", "Probability", "Simulation", "Financial risk"],
      technologies: ["Python", "Monte Carlo", "Risk Modelling"],
      githubUrl: null,
      demoUrl: null,
    },
    {
      name: "Black-Scholes-Merton Model",
      ticker: "BSM",
      description:
        "A Python implementation of the Black-Scholes-Merton options pricing model.",
      highlights: [
        "Financial mathematics",
        "Quantitative finance",
        "Mathematical modelling",
      ],
      technologies: ["Python", "Options Pricing", "Quant Finance"],
      githubUrl: null,
      demoUrl: null,
    },
    {
      name: "CrediFy",
      ticker: "CRD",
      description:
        "A FinTech decision system focused on financial and credit analysis logic.",
      highlights: [
        "Financial decision systems",
        "FinTech",
        "Data-driven logic",
      ],
      technologies: ["FinTech", "Decision Systems"],
      githubUrl: null,
      demoUrl: null,
    },
  ],
  currentlyBuilding: [
    "Quantitative equity research systems",
    "Probability and statistics",
    "Financial markets",
    "Backend architecture",
    "AI-powered systems",
  ],
  education: [
    {
      program: "BBA FinTech",
      institution: "Chandigarh University Uttar Pradesh",
      status: "Currently pursuing",
      expectedGraduation: 2030,
      description:
        "Focused on financial systems, markets, technology, and the intersection of finance with software and data-driven systems.",
    },
    {
      program: "ACCA",
      institution: "Association of Chartered Certified Accountants",
      status: "Just started",
      description:
        "Building foundations in financial reporting, accounting, financial analysis, and business finance.",
    },
  ],
};
