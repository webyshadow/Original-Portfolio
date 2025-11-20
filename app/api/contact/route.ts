// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { service, email, overview } = await req.json();

    if (!service || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const subject = `New project inquiry: ${service}`;
    const text = `
New project inquiry from portfolio:

Service: ${service}
Client email: ${email}

Project overview:
${overview || "(no overview provided)"}
`;

    const { error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || "Acme <onboarding@resend.dev>",
      to: process.env.TO_EMAIL || "ansari.shaws@gmail.com",
      replyTo: email,
      subject,
      text,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact route error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
