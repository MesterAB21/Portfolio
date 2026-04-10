"use client";

import { useState } from "react";
import { Activity } from "lucide-react";

type Sentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

type ResultData = {
  sentiment: Sentiment;
  confidence: number; // 0 to 1
  keyPhrases: string[];
};

const getSentimentColor = (sentiment: Sentiment) => {
  switch (sentiment) {
    case "POSITIVE":
      return "#1D9E75";
    case "NEUTRAL":
      return "#EF9F27";
    case "NEGATIVE":
      return "#D85A30";
  }
};

const extractFallbackPhrases = (text: string): string[] => {
  const words = text
    .split(/\W+/)
    .filter((w) => w.length > 4)
    .map((w) => w.toLowerCase());
  const unique = Array.from(new Set(words));
  return unique.slice(0, 3);
};

const fallbackScoring = (text: string): ResultData => {
  const t = text.toLowerCase();
  let score = 0;
  
  const positiveWords = ["good", "great", "awesome", "excellent", "amazing", "love", "best", "perfect"];
  const negativeWords = ["bad", "terrible", "awful", "worst", "hate", "poor", "boring"];
  
  positiveWords.forEach(w => { if (t.includes(w)) score += 1; });
  negativeWords.forEach(w => { if (t.includes(w)) score -= 1; });

  let sentiment: Sentiment = "NEUTRAL";
  if (score > 0) sentiment = "POSITIVE";
  if (score < 0) sentiment = "NEGATIVE";

  return {
    sentiment,
    confidence: Math.min(0.5 + Math.abs(score) * 0.1, 0.95), // mock confidence
    keyPhrases: extractFallbackPhrases(text),
  };
};

export default function TextClassifier() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error("API Failed");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      // Fallback
      setResult(fallbackScoring(text));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="mx-auto max-w-2xl w-full"
      style={{
        backgroundColor: "var(--surface)",
        borderRadius: "16px",
        padding: "28px",
        border: "1px solid var(--border)",
      }}
    >
      <label className="block font-syne font-semibold text-text-1 mb-4 text-lg">
        Analyze any text for sentiment and key insights
      </label>
      <textarea
        rows={4}
        placeholder="Paste any text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full font-mono text-sm p-4 outline-none transition-colors mb-4 resize-none"
        style={{
          backgroundColor: "var(--base)",
          borderColor: "var(--border)",
          borderWidth: "1px",
          borderRadius: "8px",
          color: "var(--text-1)",
        }}
      />
      <button
        onClick={handleAnalyze}
        disabled={loading || !text.trim()}
        className="w-full font-syne font-semibold py-3 flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50"
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--base)",
          borderRadius: "8px",
        }}
      >
        <Activity size={18} />
        {loading ? "Analyzing..." : "Analyze text"}
      </button>

      {/* Results Section */}
      {result && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-text-3 uppercase tracking-wider">
                Sentiment
              </span>
              <span
                className="font-syne font-bold text-sm px-3 py-1 rounded-full border"
                style={{
                  color: getSentimentColor(result.sentiment),
                  borderColor: getSentimentColor(result.sentiment) + "40",
                  backgroundColor: getSentimentColor(result.sentiment) + "10",
                }}
              >
                {result.sentiment}
              </span>
            </div>

            <div>
              <div className="flex justify-between font-mono text-xs mb-2">
                <span className="text-text-3 uppercase tracking-wider">Confidence</span>
                <span className="text-text-1">
                  {Math.round(result.confidence * 100)}%
                </span>
              </div>
              <div
                className="h-2 w-full rounded-full overflow-hidden"
                style={{ backgroundColor: "var(--base)" }}
              >
                <div
                  className="h-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${result.confidence * 100}%`,
                    backgroundColor: getSentimentColor(result.sentiment),
                  }}
                />
              </div>
            </div>

            {result.keyPhrases.length > 0 && (
              <div>
                <span className="block font-mono text-sm text-text-3 uppercase tracking-wider mb-3">
                  Key Phrases
                </span>
                <div className="flex flex-wrap gap-2">
                  {result.keyPhrases.map((phrase, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs px-3 py-1.5 rounded-md"
                      style={{
                        backgroundColor: "var(--surface-2)",
                        color: "var(--text-1)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
