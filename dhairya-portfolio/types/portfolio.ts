export interface NavigationItem {
  label: string;
  href: `#${string}`;
}

export interface Project {
  name: string;
  ticker: string;
  description: string;
  highlights: string[];
  technologies: string[];
  githubUrl: string | null;
  demoUrl: string | null;
}

export interface TechnicalProject {
  id: string;
  code: string;
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  githubUrl: string | null;
  featured: boolean;
}

export interface FinancialProject {
  id: string;
  ticker: string;
  company: string;
  title: string;
  description: string;
  analysisAreas: string[];
  status: string;
}

export interface Certification {
  id: string;
  organization: string;
  title: string;
  issuer: string;
  issuedDate: string;
  description?: string;
  credentialUrl?: string;
}

export interface CapabilityCategory {
  title: string;
  capabilities: string[];
}

export interface Education {
  program: string;
  institution: string;
  status: string;
  expectedGraduation?: number;
  description: string;
}

export interface ContactLinks {
  email: string;
  phone: string;
  github: string;
  linkedin: string;
}

export interface PortfolioOwner {
  name: string;
  title: string;
  heroDescription: string;
  supportingDescription: string;
}

export interface PortfolioData {
  owner: PortfolioOwner;
  contact: ContactLinks;
  navigation: NavigationItem[];
  capabilities: CapabilityCategory[];
  projects: Project[];
  technicalProjects: TechnicalProject[];
  financialProjects: FinancialProject[];
  certifications: Certification[];
  currentlyBuilding: string[];
  education: Education[];
}
