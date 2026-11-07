"use client";
import { useState,type FormEvent } from "react";
type RequestType="meeting"|"service";
export function RequestForm({initialType,initialSubject}:{initialType:RequestType;initialSubject:string}){
 const [type,setType]=useState<RequestType>(initialType),[status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle"),[error,setError]=useState("");
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setStatus("sending");setError("");const form=event.currentTarget,payload=Object.fromEntries(new FormData(form).entries());payload.type=type;
  try{const response=await fetch("/api/requests",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});const result=await response.json();if(!response.ok)throw new Error(result.error||"Unable to submit your request.");setStatus("success");form.reset();}
  catch(err){setError(err instanceof Error?err.message:"Something went wrong. Please try again.");setStatus("error");}
 }
 return <form onSubmit={submit} className="border border-[var(--border)] bg-[var(--panel)] p-5 sm:p-8">
  <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-6"><button type="button" onClick={()=>setType("meeting")} className={`button ${type==="meeting"?"button--primary":"button--secondary"}`}>Meeting request</button><button type="button" onClick={()=>setType("service")} className={`button ${type==="service"?"button--primary":"button--secondary"}`}>Project enquiry</button></div>
  {status==="success"?<div role="status" className="py-12"><p className="terminal-text">request_received / 200</p><h2 className="mt-4 text-2xl font-semibold">Thanks for reaching out.</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Your request has been submitted. I&apos;ll review it and follow up using the email address you provided.</p><button className="button button--secondary mt-7" type="button" onClick={()=>setStatus("idle")}>Send another request</button></div>:<>
   <div className="grid gap-5 pt-6 sm:grid-cols-2">
    <Field label="Your name" name="name" required placeholder="Full name"/><Field label="Work email" name="email" type="email" required placeholder="you@company.com"/>
    <Field label="Organization (optional)" name="organization" placeholder="Company / institution"/><Field label={type==="meeting"?"Meeting topic":"Service required"} name="subject" required defaultValue={initialSubject} placeholder={type==="meeting"?"What would you like to discuss?":"Which service are you interested in?"}/>
   </div>
   {type==="meeting"&&<div className="mt-5 grid gap-5 sm:grid-cols-2"><Field label="Preferred date (optional)" name="preferredDate" type="date"/><label className="block"><span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">Meeting format</span><select name="meetingFormat" className="form-control"><option>Google Meet</option><option>Phone</option><option>In person</option><option>No preference</option></select></label></div>}
   <label className="mt-5 block"><span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">{type==="meeting"?"Agenda / context":"Project brief"}</span><textarea name="message" required minLength={10} maxLength={5000} rows={6} placeholder={type==="meeting"?"A few points you would like to cover...":"Describe the problem, expected deliverables, data availability, and timeline..."} className="form-control resize-y"/></label>
   <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label>Company website<input name="companyWebsite" tabIndex={-1} autoComplete="off"/></label></div>
   {status==="error"&&<p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}
   <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xs text-xs leading-5 text-[var(--muted)]">Submitting does not confirm a booking. Meeting times are confirmed by email.</p><button className="button button--primary" disabled={status==="sending"} type="submit">{status==="sending"?"Submitting...":"Submit request ↗"}</button></div>
  </>}
 </form>;
}
function Field({label,name,required,placeholder,type="text",defaultValue}:{label:string;name:string;required?:boolean;placeholder?:string;type?:string;defaultValue?:string}){
 return <label className="block"><span className="mb-2 block font-mono text-[0.68rem] uppercase tracking-wider text-[var(--muted)]">{label}</span><input className="form-control" name={name} type={type} required={required} placeholder={placeholder} defaultValue={defaultValue}/></label>;
}
