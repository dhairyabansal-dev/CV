import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  owner: {
    name: "Dhairya Bansal",
    title: "Hybrid Finance & Technology Builder",
    heroDescription:
      "I work at the intersection of finance, quantitative analysis, and technology — combining financial modelling and valuation with data, AI, and software systems.",
    supportingDescription:
      "From DCF and equity valuation to quantitative models, market analytics, and AI-powered applications, I learn by building across both finance and technology.",
  },
  contact: {
    email: "dhairyabansal090@gmail.com",
    phone: "9455198168",
    github: "https://github.com/dhairyabansal-dev",
    linkedin: "https://www.linkedin.com/in/dhairya-bansal090/",
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
      githubUrl: "https://github.com/dhairyabansal-dev/Roy---OS",
      demoUrl: null,
    },
    {
      name: "Ethereum Tracker",
      ticker: "ETH",
      description:
        "A blockchain analytics project focused on exploring Ethereum transaction data and understanding on-chain activity through APIs and structured data workflows.",
      highlights: [
        "Ethereum transaction tracking",
        "Blockchain analytics",
        "API integration",
        "On-chain data analysis",
      ],
      technologies: ["Ethereum", "Blockchain APIs", "Python", "Data Analysis"],
      githubUrl: "https://github.com/dhairyabansal-dev/Ethereum-Tracker",
      demoUrl: null,
    },
    {
      name: "Monte Carlo Risk Engine",
      ticker: "MCR",
      description:
        "A quantitative finance engine that uses Monte Carlo simulation to model probabilistic financial outcomes and support risk analysis.",
      highlights: ["Python", "Probability", "Simulation", "Financial risk"],
      technologies: ["Python", "Monte Carlo", "Risk Modelling"],
      githubUrl: "https://github.com/dhairyabansal-dev/Monte-Carlo-Risk",
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
      githubUrl: "https://github.com/dhairyabansal-dev/Black-School-Model",
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
      githubUrl: "https://github.com/dhairyabansal-dev/Credify",
      demoUrl: null,
    },
  ],
  technicalProjects: [
    {
      id: "roy-os",
      code: "ROY",
      title: "Roy OS",
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
      githubUrl: "https://github.com/dhairyabansal-dev/Roy---OS",
      featured: true,
    },
    {
      id: "monte-carlo-risk-engine",
      code: "MCR",
      title: "Monte Carlo Risk Engine",
      description:
        "A quantitative finance engine that uses Monte Carlo simulation to model probabilistic financial outcomes and support risk analysis.",
      highlights: ["Python", "Probability", "Simulation", "Financial risk"],
      technologies: ["Python", "Monte Carlo", "Risk Modelling"],
      githubUrl: "https://github.com/dhairyabansal-dev/Monte-Carlo-Risk",
      featured: true,
    },
    {
      id: "credify",
      code: "CRD",
      title: "CrediFy",
      description:
        "A FinTech decision system focused on financial and credit analysis logic.",
      highlights: [
        "Financial decision systems",
        "FinTech",
        "Data-driven logic",
      ],
      technologies: ["FinTech", "Decision Systems"],
      githubUrl: "https://github.com/dhairyabansal-dev/Credify",
      featured: true,
    },
    {
      id: "black-scholes-model",
      code: "BSM",
      title: "Black-Scholes Model",
      description:
        "A Python implementation of the Black-Scholes-Merton options pricing model.",
      highlights: [
        "Financial mathematics",
        "Quantitative finance",
        "Mathematical modelling",
      ],
      technologies: ["Python", "Options Pricing", "Quant Finance"],
      githubUrl: "https://github.com/dhairyabansal-dev/Black-School-Model",
      featured: true,
    },
    {
      id: "ethereum-tracker",
      code: "ETH",
      title: "Ethereum Tracker",
      description:
        "A blockchain analytics project focused on exploring Ethereum transaction data and understanding on-chain activity through APIs and structured data workflows.",
      highlights: [
        "Ethereum transaction tracking",
        "Blockchain analytics",
        "API integration",
        "On-chain data analysis",
      ],
      technologies: ["Ethereum", "Blockchain APIs", "Python", "Data Analysis"],
      githubUrl: "https://github.com/dhairyabansal-dev/Ethereum-Tracker",
      featured: false,
    },
    {
      id: "chatbot-1",
      code: "AI",
      title: "Chatbot / AI Project",
      description: "",
      highlights: [],
      technologies: [],
      githubUrl: "https://github.com/dhairyabansal-dev/Chatbot-1",
      featured: false,
    },
  ],
  financialProjects: [
    {
      id: "adani-enterprises-equity-analysis",
      ticker: "ADANIENT",
      company: "Adani Enterprises",
      title: "Equity Analysis & Valuation",
      description: "",
      analysisAreas: [
        "5-year financial performance",
        "growth analysis",
        "profitability metrics",
        "ROE",
        "net margin",
        "debt-to-equity",
        "leverage analysis",
        "CAPM discount rate",
        "valuation multiples",
        "DCF valuation",
        "scenario analysis",
        "sensitivity analysis",
        "business and financial risks",
      ],
      status: "",
    },
    {
      id: "reliance-industries-valuation",
      ticker: "RELIANCE",
      company: "Reliance Industries",
      title: "Valuation Report",
      description: "",
      analysisAreas: [
        "financial statement analysis",
        "growth and profitability",
        "CAPM",
        "valuation multiples",
        "DCF valuation",
        "scenario analysis",
        "sensitivity analysis",
      ],
      status: "",
    },
    {
      id: "samsung-electronics-valuation",
      ticker: "005930.KS",
      company: "Samsung Electronics",
      title: "Valuation Analysis",
      description: "",
      analysisAreas: [
        "historical financial performance",
        "growth",
        "profitability",
        "ROE",
        "leverage",
        "CAPM",
        "DCF valuation",
        "sensitivity analysis",
      ],
      status: "",
    },
    {
      id: "tata-motors-equity-analysis",
      ticker: "TATAMOTORS",
      company: "Tata Motors",
      title: "Equity Analysis & DCF Valuation",
      description: "",
      analysisAreas: [
        "financial statements",
        "growth analysis",
        "profitability ratios",
        "CAPM",
        "valuation multiples",
        "DCF",
        "scenario analysis",
        "sensitivity analysis",
        "risk analysis",
      ],
      status: "",
    },
  ],
  certifications: [
    {
      id: "ey-forensic-integrity-services",
      organization: "EY / Forage",
      title: "EY - Forensic and Integrity Services Job Simulation",
      issuer: "Forage",
      issuedDate: "Aug 2026",
    },
    {
      id: "goldman-sachs-operations",
      organization: "Goldman Sachs / Forage",
      title: "Goldman Sachs Operations Job Simulation",
      issuer: "Forage",
      issuedDate: "Aug 2026",
      description:
        "Completed an industry-oriented operations simulation focused on financial services workflows and operational processes.",
    },
    {
      id: "microsoft-excel-intermediate",
      organization: "Microsoft",
      title: "Microsoft Certified Excel For Intermediate Level",
      issuer: "Microsoft",
      issuedDate: "Aug 2026",
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
