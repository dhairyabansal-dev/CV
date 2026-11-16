import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  owner: {
    name: "Dhairya Bansal",
    title: "Finance & Business Analytics | Financial Modelling & Research",
    heroDescription:
      "I turn financial statements, operating assumptions, and market data into structured forecasts, valuation analysis, and decision-ready research.",
    supportingDescription:
      "My work spans Excel-based financial modelling, company valuation, business and credit analysis, and quantitative risk research. I use Python and software systems as tools to strengthen financial analysis — not as the headline.",
  },
  contact: {
    email: "dhairyabansal090@gmail.com",
    phone: "9455198168",
    github: "https://github.com/dhairyabansal-dev",
    linkedin: "https://www.linkedin.com/in/dhairya-bansal090/",
  },
  navigation: [
    { label: "Financial Work", href: "#financial-research" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  capabilities: [
    {
      title: "Finance & Business Analysis",
      capabilities: [
        "Excel Financial Modelling",
        "Revenue & Profitability Forecasting",
        "Financial Statement Analysis",
        "DCF & Comparable Company Valuation",
        "Business and Market Research",
        "Credit & Lending Analysis",
        "Research Reports & Presentations",
      ],
    },
    {
      title: "Quantitative Finance",
      capabilities: [
        "Monte Carlo Simulation",
        "Portfolio & Downside Risk",
        "Value at Risk (VaR) & Expected Shortfall",
        "Options Pricing & Black-Scholes",
        "Backtesting & Performance Metrics",
        "Market Microstructure Analytics",
      ],
    },
    {
      title: "Data & Analytics",
      capabilities: [
        "Python for Financial Analysis",
        "Financial Data Processing",
        "ETL & Data Validation",
        "Excel, CSV & Structured Reporting",
        "Data Visualisation",
        "Analytical Automation",
      ],
    },
    {
      title: "Technology & FinTech",
      capabilities: [
        "Python & Backend Systems",
        "APIs & Databases",
        "Financial Decision Systems",
        "AI / LLM Applications",
        "Blockchain & On-chain Analytics",
      ],
    },
  ],
  projects: [
    { name: "CrediFy", ticker: "CRD", description: "A rule-based digital lending case study that evaluates loan eligibility using applicant age, credit score, and FOIR, assigns risk-tiered interest rates, calculates EMI, and presents portfolio insights in a Streamlit dashboard.", highlights: ["Loan eligibility rules", "FOIR calculation", "Credit-tier pricing", "EMI calculations", "Portfolio dashboard"], technologies: ["Python", "Streamlit", "Financial Analysis"], githubUrl: "https://github.com/dhairyabansal-dev/Credify", demoUrl: null },
    { name: "Financial Data Warehouse", ticker: "FDW", description: "A financial data pipeline that collects, validates, transforms, and stores structured financial information for downstream analysis and reporting.", highlights: ["ETL pipeline", "Financial data modelling", "Data validation", "SQLite storage", "Excel / CSV / Power BI exports"], technologies: ["Python", "ETL", "SQL", "Financial Data"], githubUrl: "https://github.com/dhairyabansal-dev/Financial-Data-Warehouse", demoUrl: null },
    { name: "QuantEdge", ticker: "QED", description: "A quantitative research toolkit for lagged strategy backtesting, transaction-cost-aware returns, benchmark comparison, and performance and downside-risk measurement.", highlights: ["Lagged signal execution", "Fees and slippage", "Benchmark comparison", "Sharpe & Sortino", "VaR, CVaR & drawdown"], technologies: ["Python", "Pandas", "Backtesting", "Risk Analytics"], githubUrl: "https://github.com/dhairyabansal-dev/QuantEdge", demoUrl: null },
  ],
  technicalProjects: [
    { id: "credify", code: "CRD", title: "CrediFy", description: "A rule-based digital lending case study covering loan eligibility, FOIR, credit-tier interest rates, EMI calculations, and a Streamlit portfolio dashboard.", highlights: ["Loan eligibility", "FOIR", "Credit-tier pricing", "EMI"], technologies: ["Python", "Streamlit", "Financial Analysis"], githubUrl: "https://github.com/dhairyabansal-dev/Credify", featured: true },
    { id: "financial-data-warehouse", code: "FDW", title: "Financial Data Warehouse", description: "An ETL pipeline for collecting, validating, transforming, and storing structured financial data for analysis and reporting.", highlights: ["ETL", "Data validation", "Financial data", "Reporting"], technologies: ["Python", "SQL", "ETL"], githubUrl: "https://github.com/dhairyabansal-dev/Financial-Data-Warehouse", featured: true },
    { id: "quantedge", code: "QED", title: "QuantEdge", description: "A quantitative research toolkit for cost-aware backtesting, benchmark comparison, performance measurement, and downside-risk analysis.", highlights: ["Backtesting", "Transaction costs", "Performance metrics", "VaR / CVaR"], technologies: ["Python", "Pandas", "Quantitative Finance"], githubUrl: "https://github.com/dhairyabansal-dev/QuantEdge", featured: true },
    { id: "monte-carlo-risk-engine", code: "MCR", title: "Monte Carlo Risk Engine", description: "A quantitative finance project using Monte Carlo simulation to explore probabilistic financial outcomes and risk.", highlights: ["Probability", "Simulation", "Financial risk"], technologies: ["Python", "Monte Carlo", "Risk Modelling"], githubUrl: "https://github.com/dhairyabansal-dev/Monte-Carlo-Risk", featured: false },
    { id: "volatility-surface-engine", code: "VOL", title: "Volatility Surface Engine", description: "An options analytics project with numerical implied-volatility solvers and volatility-surface tooling.", highlights: ["Implied volatility", "Numerical solvers", "Options analytics"], technologies: ["Python", "Options Pricing", "Quant Finance"], githubUrl: "https://github.com/dhairyabansal-dev/Volatility-Surface-Engine", featured: false },
    { id: "market-microstructure-engine", code: "MME", title: "Market Microstructure Engine", description: "A market analytics project focused on order-book behaviour and execution-quality measures.", highlights: ["Bid-ask spread", "Order-book imbalance", "VWAP / TWAP", "Execution costs"], technologies: ["Python", "Market Data", "Analytics"], githubUrl: "https://github.com/dhairyabansal-dev/Market-Microstructure-Engine", featured: false },
    { id: "black-scholes-model", code: "BSM", title: "Black-Scholes-Merton Model", description: "A Python implementation of the Black-Scholes-Merton options pricing model.", highlights: ["Options pricing", "Financial mathematics"], technologies: ["Python", "Options Pricing"], githubUrl: "https://github.com/dhairyabansal-dev/Black-School-Model", featured: false },
    { id: "roy-os", code: "ROY", title: "Roy OS", description: "A local-first AI planning and scheduling system. Included as a secondary software project.", highlights: ["AI systems", "Planning architecture", "Scheduling"], technologies: ["AI / LLM", "Python"], githubUrl: "https://github.com/dhairyabansal-dev/Roy---OS", featured: false },
  ],
  financialProjects: [
    { id: "adani-enterprises-equity-analysis", ticker: "ADANIENT", company: "Adani Enterprises", title: "Equity Analysis & Valuation", description: "Independent company research covering historical performance, profitability, leverage, valuation assumptions, and scenario-based DCF analysis.", analysisAreas: ["5-year financial performance", "growth analysis", "profitability metrics", "ROE", "net margin", "debt-to-equity", "leverage analysis", "CAPM discount rate", "valuation multiples", "DCF valuation", "scenario analysis", "sensitivity analysis", "business and financial risks"], status: "" },
    { id: "reliance-industries-valuation", ticker: "RELIANCE", company: "Reliance Industries", title: "Valuation Report", description: "Financial statement and valuation analysis examining growth, profitability, DCF assumptions, and how different scenarios affect estimated value.", analysisAreas: ["financial statement analysis", "growth and profitability", "CAPM", "valuation multiples", "DCF valuation", "scenario analysis", "sensitivity analysis"], status: "" },
    { id: "samsung-electronics-valuation", ticker: "005930.KS", company: "Samsung Electronics", title: "Valuation Analysis", description: "Company valuation research built around historical financial performance, profitability and leverage metrics, DCF assumptions, and sensitivity analysis.", analysisAreas: ["historical financial performance", "growth", "profitability", "ROE", "leverage", "CAPM", "DCF valuation", "sensitivity analysis"], status: "" },
    { id: "tata-motors-equity-analysis", ticker: "TATAMOTORS", company: "Tata Motors", title: "Equity Analysis & DCF Valuation", description: "Equity analysis combining financial statement review, profitability ratios, valuation methods, and scenario-based analysis of valuation and risk.", analysisAreas: ["financial statements", "growth analysis", "profitability ratios", "CAPM", "valuation multiples", "DCF", "scenario analysis", "sensitivity analysis", "risk analysis"], status: "" },
  ],
  certifications: [
    { id: "cbre-project-management", organization: "CBRE / Forage", title: "CBRE Project Management Job Simulation", issuer: "Forage", issuedDate: "Oct 2026", description: "Practised project planning and project management through a job simulation.", credentialId: "6a81765d6dfcb5ce710e0861", skills: ["Project Management", "Project Planning"] },
    { id: "hack2innovate-national-grand-finale", organization: "Quick Heal", title: "Hack2Innovate CTF + Hackathon 2026 — National Grand Finale, 4th Place", issuer: "Quick Heal", issuedDate: "Sep 2026", description: "Secured 4th place at the national grand finale as part of Cyberleeks, representing Chandigarh University. Competed in cybersecurity challenges, CTF problem-solving, and hackathon challenges under time pressure.", skills: ["Cybersecurity", "CTF Problem-Solving", "Teamwork", "Hackathon"] },
    { id: "ey-forensic-integrity-services", organization: "EY / Forage", title: "EY - Forensic and Integrity Services Job Simulation", issuer: "Forage", issuedDate: "Aug 2026", credentialId: "6a81bf0caa694bdf89b7a6f1", skills: ["Financial Integrity", "Forensic Analysis", "Project Management"] },
    { id: "goldman-sachs-operations", organization: "Goldman Sachs / Forage", title: "Goldman Sachs Operations Job Simulation", issuer: "Forage", issuedDate: "Aug 2026", description: "Completed an industry-oriented operations simulation focused on financial services workflows and processes involved in facilitating ultra-high-net-worth transactions.", skills: ["Financial Operations", "Financial Reporting", "Microsoft Excel"] },
    { id: "microsoft-excel-intermediate", organization: "Microsoft", title: "Microsoft Certified Excel For Intermediate Level", issuer: "Microsoft", issuedDate: "Aug 2026", skills: ["Microsoft Excel", "Business Analysis"] },
  ],
  currentlyBuilding: ["Financial modelling and valuation workflows", "Company and sector research", "Quantitative risk and portfolio analytics", "Financial data pipelines", "Credit and lending decision analysis"],
  education: [
    { program: "BBA FinTech", institution: "Chandigarh University Uttar Pradesh", status: "Currently pursuing", expectedGraduation: 2030, description: "Focused on financial systems, markets, technology, and the intersection of finance with software and data-driven systems." },
    { program: "ACCA", institution: "Association of Chartered Certified Accountants", status: "Just started", description: "Building foundations in financial reporting, accounting, financial analysis, and business finance." },
  ],
};
