// app/api/sendEmail/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const data = await req.json(); // { to, subject, body }

  try {
    const result = await resend.emails.send({
      from: 'AMACE Monitoring <onboarding@resend.dev>',
      to: 'xxsimonde44xx@gmail.com',
      subject: data.subject,
      html: `<p>${data.body}</p>`,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
