import type { Metadata } from "next";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { RequestForm } from "@/components/requests/request-form";
export const metadata: Metadata={title:"Start a Conversation",description:"Send a project enquiry or request a professional meeting with Dhairya Bansal."};
export default async function BookPage({searchParams}:PageProps<"/book">){
 const params=await searchParams, initialType=params.type==="service"?"service":"meeting", initialSubject=typeof params.subject==="string"?params.subject:"";
 return <><Navigation/><main className="section !border-t-0"><Container><p className="terminal-text">collaboration_portal / request_access</p>
 <div className="mt-5 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div>
 <h1 className="text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">Let&apos;s talk about the work.</h1>
 <p className="mt-6 max-w-md leading-7 text-[var(--muted)]">Share context about your project or meeting. I review requests personally and follow up by email to confirm availability and next steps.</p>
 <div className="mt-10 border-l border-[var(--accent)] pl-5"><p className="terminal-text">Response process</p><ol className="mt-4 space-y-3 text-sm text-[var(--muted)]"><li>01 — Send your request and a short agenda.</li><li>02 — I review the context and availability.</li><li>03 — You receive a reply to coordinate next steps.</li></ol></div>
 </div><RequestForm initialType={initialType} initialSubject={initialSubject}/></div>
 </Container></main><Footer/></>;
}
