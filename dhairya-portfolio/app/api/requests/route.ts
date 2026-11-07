import { NextResponse } from "next/server";
export const runtime = "nodejs";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) return NextResponse.json({ ok: true });
    const name=String(body.name??"").trim(), email=String(body.email??"").trim().toLowerCase();
    const organization=String(body.organization??"").trim(), type=String(body.type??"").trim();
    const subject=String(body.subject??"").trim(), message=String(body.message??"").trim();
    const preferredDate=body.preferredDate?String(body.preferredDate):null;
    const meetingFormat=body.meetingFormat?String(body.meetingFormat):null;
    if(name.length<2||name.length>100||!emailPattern.test(email)||!["service","meeting"].includes(type)||subject.length<2||subject.length>160||message.length<10||message.length>5000)
      return NextResponse.json({error:"Please check the required fields and try again."},{status:400});
    const url=process.env.SUPABASE_URL, key=process.env.SUPABASE_ANON_KEY;
    if(!url||!key) return NextResponse.json({error:"The request portal is not connected yet. Please email dhairyabansal090@gmail.com directly for now."},{status:503});
    const response=await fetch(`${url.replace(/\/$/,"")}/rest/v1/inquiries`,{
      method:"POST",headers:{apikey:key,Authorization:`Bearer ${key}`,"Content-Type":"application/json",Prefer:"return=minimal"},
      body:JSON.stringify({name,email,organization:organization||null,type,subject,message,preferred_date:preferredDate,meeting_format:meetingFormat,status:"new"}),cache:"no-store",
    });
    if(!response.ok){console.error("Inquiry storage failed:",response.status,await response.text());return NextResponse.json({error:"We couldn't save your request. Please try again or email directly."},{status:502});}
    return NextResponse.json({ok:true});
  } catch { return NextResponse.json({error:"Invalid request. Please refresh and try again."},{status:400}); }
}
