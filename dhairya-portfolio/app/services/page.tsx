import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
export const metadata: Metadata = { title:"Professional Services",description:"Financial analysis, data analytics, Python automation, and quantitative research services by Dhairya Bansal." };
const services=[
 {code:"FIN-01",title:"Financial Analysis & Modelling",description:"Structured financial analysis to understand business performance, assumptions, and valuation drivers.",items:["Financial statement and ratio analysis","Revenue, cost and profitability models","DCF valuation and scenario analysis","Excel-based financial models"]},
 {code:"DAT-02",title:"Data Analytics & Dashboards",description:"Turn raw datasets into clean, interpretable analysis and decision-support reporting.",items:["Data cleaning and transformation","Exploratory data analysis","Python-based analysis workflows","Excel reports and dashboards"]},
 {code:"BUS-03",title:"Business & Market Research",description:"Evidence-led research for business questions, market understanding, and strategic evaluation.",items:["Market and competitor research","Business model analysis","Industry research briefs","KPI and operating performance analysis"]},
 {code:"QNT-04",title:"Quantitative Research Support",description:"Research-oriented quantitative workflows, from hypothesis formulation to reproducible backtests.",items:["Exploratory market-data analysis","Statistical testing and diagnostics","Strategy prototyping and backtesting","Risk and scenario simulations"]},
 {code:"AUT-05",title:"Python & Workflow Automation",description:"Practical software tools that reduce repetitive work and make analytical processes repeatable.",items:["Python scripts and data pipelines","Spreadsheet workflow automation","API integrations","Documentation and handover"]},
];
export default function ServicesPage(){return <><Navigation/><main>
 <section className="section !border-t-0"><Container><p className="terminal-text">professional_services / 01</p><div className="mt-5 max-w-3xl">
 <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Research, analysis & systems that solve real problems.</h1>
 <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">Independent project support across finance, data, business research, and Python automation. Every engagement starts with a clear brief, scope, and deliverables.</p>
 <div className="mt-8 flex flex-wrap gap-3"><a className="button button--primary" href="/book?type=service">Discuss a project ↗</a><a className="button button--secondary" href="/#projects">View relevant work</a></div></div></Container></section>
 <section className="section"><Container><SectionHeading eyebrow="What I can help with" title="Service catalogue" description="Engagements are scoped individually based on the problem, data availability, timeline, and expected output."/>
 <div className="mt-12 grid gap-4 lg:grid-cols-2">{services.map((s)=><article className="border border-[var(--border)] bg-[var(--panel)] p-6 sm:p-8" key={s.code}>
 <div className="flex justify-between gap-4"><p className="terminal-text">{s.code}</p><span className="font-mono text-xs text-[var(--muted)]">PROJECT-BASED</span></div>
 <h2 className="mt-5 text-2xl font-semibold tracking-tight">{s.title}</h2><p className="mt-3 leading-7 text-[var(--muted)]">{s.description}</p>
 <p className="terminal-text mt-7">Potential deliverables</p><ul className="mt-3 space-y-2 text-sm">{s.items.map((item)=><li key={item} className="flex gap-3"><span className="text-[var(--accent)]">—</span>{item}</li>)}</ul>
 <a className="mt-8 inline-flex font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)] hover:text-[var(--accent-strong)]" href={`/book?type=service&subject=${encodeURIComponent(s.title)}`}>Enquire about this service ↗</a>
 </article>)}</div>
 <p className="mt-8 max-w-3xl text-sm leading-6 text-[var(--muted)]">Quantitative research services are research and analytical support, not investment recommendations or promises of trading performance. Scope, data access, and deliverables are agreed before work begins.</p>
 </Container></section></main><Footer/></>;}
