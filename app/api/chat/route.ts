import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an AI assistant representing Hamaidi Abderrahmane's portfolio.
You answer questions about his skills, projects, and experience.
Key facts:
- Full-stack developer (React, Next.js, Node.js, TypeScript, PostgreSQL, Docker)
- Data Scientist (Python, Pandas, Scikit-learn, TensorFlow, SQL)
- AI/Automation engineer (LangChain, OpenAI API, RAG, n8n, Hugging Face)
- Based in Algeria, open to remote work worldwide
- Available for freelance projects and full-time roles
- Built 15+ projects across web, data, and AI domains
Keep answers concise (2-4 sentences). Be professional but warm. 
If asked about something not in this brief, say you don't have that info 
and suggest contacting directly.`;

export async function POST(req: Request) {
  try {
    const apiKey =
      process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        message:
          "I am running in demo mode without an API key. To enable full chat functionality, please add OPENAI_API_KEY to the environment variables.",
      });
    }

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "OpenAI API request failed");
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "No response received.";

    return NextResponse.json({ message: reply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to the AI model. Try again later." },
      { status: 500 }
    );
  }
}
