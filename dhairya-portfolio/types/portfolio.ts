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
  currentlyBuilding: string[];
  education: Education[];
}
