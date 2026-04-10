import { NextResponse } from "next/server";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export async function POST(req: Request) {
  try {
    const { name, email, project, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    } 

    if (!resend) {
      console.log("Mock Contact Submission:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Project:", project);
      console.log("Message:", message);
      return NextResponse.json({ success: true, mock: true });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["your@email.com"], // Placeholder email per requirements
      subject: `New contact form submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Project: ${project}
Message: ${message}
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Contact API exception:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
