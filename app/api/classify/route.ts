import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Call Hugging Face API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Usually needs an API token for reliable use, but public models might allow limited auth-less.
          // In practice if it fails, our frontend handles gracefully via fallback.
        },
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      throw new Error(`HF API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // HF sentiment-latest mostly returns format: [[ { label: 'positive', score: 0.96 }, ... ]]
    if (!data || !Array.isArray(data) || !data[0]) {
      throw new Error("Invalid output format from Hugging Face");
    }

    const predictions = data[0]; // array of objects
    // Find highest score
    const bestPrediction = predictions.reduce((prev: any, current: any) =>
      prev.score > current.score ? prev : current
    );

    let sentiment = "NEUTRAL";
    if (bestPrediction.label === "positive") sentiment = "POSITIVE";
    if (bestPrediction.label === "negative") sentiment = "NEGATIVE";

    // Extract fake key phrases since sentiment model only returns sentiment
    const extractPhrases = (text: string) => {
      const words = text
        .split(/\W+/)
        .filter((w) => w.length > 4)
        .map((w) => w.toLowerCase());
      const unique = Array.from(new Set(words));
      return unique.slice(0, 3);
    };

    return NextResponse.json({
      sentiment,
      confidence: bestPrediction.score,
      keyPhrases: extractPhrases(text),
    });
  } catch (error: any) {
    console.error("Classification Error:", error);
    // Let the frontend handle the fallback
    return NextResponse.json(
      { error: "Classification failed" },
      { status: 500 }
    );
  }
}
