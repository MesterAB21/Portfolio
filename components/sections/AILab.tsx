"use client";

import { useState } from "react";
import AiAssistant from "./ailab/AiAssistant";
import TextClassifier from "./ailab/TextClassifier";
import PipelineVisualizer from "./ailab/PipelineVisualizer";

const TABS = ["AI Assistant", "Text Classifier", "Pipeline Visualizer"];

export default function AILab() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="ailab" className="py-32 px-6 bg-base">
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
        {/* Section Header */}
        <p className="font-mono text-sm tracking-widest uppercase mb-3 text-ai">
          AI LAB
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-5xl text-text-1 mb-4 flex items-center">
          Live experiments.
          <span className="blinking-cursor text-accent ml-1">|</span>
        </h2>
        <p className="font-syne text-[16px] text-text-2 mb-12 text-center max-w-2xl">
          Not just projects on a page — things you can actually use.
        </p>

        {/* Tab Switcher */}
        <div
          className="flex p-1 mb-12"
          style={{
            backgroundColor: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
          }}
        >
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className="font-syne font-semibold px-4 md:px-6 py-2 transition-all duration-300 whitespace-nowrap"
              style={{
                backgroundColor: activeTab === idx ? "var(--accent)" : "transparent",
                color: activeTab === idx ? "var(--base)" : "var(--text-3)",
                borderRadius: "8px",
              }}
              onMouseEnter={(e) => {
                if (activeTab !== idx) e.currentTarget.style.color = "var(--text-2)";
              }}
              onMouseLeave={(e) => {
                if (activeTab !== idx) e.currentTarget.style.color = "var(--text-3)";
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="w-full flex justify-center">
          {activeTab === 0 && <AiAssistant />}
          {activeTab === 1 && <TextClassifier />}
          {activeTab === 2 && <PipelineVisualizer />}
        </div>
      </div>
    </section>
  );
}

