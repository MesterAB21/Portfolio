"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export default function AiAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm an AI trained on Hamaidi Abderrahmane's portfolio. Ask me about his projects, skills, or experience — I'll give you the real answers.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load message count from localStorage
    const savedCount = localStorage.getItem("hamaidi_ai_msg_count");
    if (savedCount) {
      setMessageCount(parseInt(savedCount, 10));
    }
  }, []);

  const incrementCount = () => {
    const newCount = messageCount + 1;
    setMessageCount(newCount);
    localStorage.setItem("hamaidi_ai_msg_count", newCount.toString());
  };

  const limitReached = messageCount >= 4;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || limitReached || loading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    incrementCount();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error || "Something went wrong." },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Failed to connect to the server. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col mx-auto max-w-2xl w-full"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border)",
        borderWidth: "1px",
        borderRadius: "16px",
        height: "420px",
      }}
    >
      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
        {messages.map((msg, idx) => {
          if (msg.role === "system") return null;
          const isUser = msg.role === "user";
          return (
            <div
              key={idx}
              className={`flex w-full ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`font-syne text-[14px] py-3 px-4 max-w-[75%] ${
                  isUser
                    ? "bg-accent text-base-dark rounded-t-2xl rounded-bl-2xl rounded-br-sm"
                    : "bg-surface-2 text-text-1 rounded-t-2xl rounded-br-2xl rounded-bl-sm"
                }`}
                style={{
                  backgroundColor: isUser ? "var(--accent)" : "var(--surface-2)",
                  color: isUser ? "var(--base)" : "var(--text-1)",
                }}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        {loading && (
          <div className="flex w-full justify-start">
            <div
              className="font-syne text-[14px] py-3 px-4 max-w-[75%] bg-surface-2 text-text-1 rounded-t-2xl rounded-br-2xl rounded-bl-sm flex space-x-1"
              style={{
                backgroundColor: "var(--surface-2)",
                color: "var(--text-1)",
              }}
            >
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                .
              </span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                .
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div
        className="p-4"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {limitReached ? (
          <div className="text-center font-mono text-sm text-text-2 my-2">
            Message limit reached.{" "}
            <a
              href="#contact"
              className="text-accent hover:underline transition-colors"
            >
              Contact me directly &rarr;
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
              className="flex-1 font-mono text-sm py-2 px-3 outline-none transition-colors"
              style={{
                backgroundColor: "var(--base)",
                borderColor: "var(--border)",
                borderWidth: "1px",
                borderRadius: "8px",
                color: "var(--text-1)",
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex items-center justify-center font-syne font-semibold transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--base)",
                borderRadius: "8px",
                padding: "0 20px",
              }}
            >
              <Send size={16} className="md:hidden" />
              <span className="hidden md:inline">Send</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
