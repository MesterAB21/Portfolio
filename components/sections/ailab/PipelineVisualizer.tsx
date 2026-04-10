"use client";

import { useState, useRef } from "react";
import { User, Globe, Sparkles, Database, Bell, Play, CheckCircle2 } from "lucide-react";

const nodes = [
  { id: "lead", label: "Lead Input", icon: User },
  { id: "scraper", label: "Web Scraper", icon: Globe },
  { id: "llm", label: "LLM Enricher", icon: Sparkles },
  { id: "crm", label: "CRM Writer", icon: Database },
  { id: "slack", label: "Slack Alert", icon: Bell },
];

export default function PipelineVisualizer() {
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsSuccess(false);
    setActiveNodeIndex(-1);

    const delays = nodes.map((_, i) => i * 600);

    delays.forEach((delay, index) => {
      setTimeout(() => {
        setActiveNodeIndex(index);
      }, delay);
    });

    const totalTime = nodes.length * 600;
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        setIsRunning(false);
        setIsSuccess(false);
        setActiveNodeIndex(-1);
      }, 3000);
    }, totalTime);
  };

  return (
    <div
      className="mx-auto max-w-4xl w-full flex flex-col items-center justify-center p-8"
      style={{
        backgroundColor: "var(--surface)",
        borderRadius: "16px",
        border: "1px solid var(--border)",
      }}
    >
      <style>{`
        @keyframes dashflow {
          to {
            stroke-dashoffset: -20;
          }
        }
        .dash-line {
          stroke: var(--accent);
          stroke-width: 2;
          stroke-dasharray: 6 4;
          opacity: 0.6;
          animation: dashflow 1.5s linear infinite;
        }
        .node-glow {
          box-shadow: 0 0 20px 0 var(--accent);
          border-color: var(--accent) !important;
        }
      `}</style>
      
      <div className="flex w-full justify-between items-center mb-12">
        <h3 className="font-syne font-semibold text-text-1 text-xl">
          Lead Enrichment Pipeline
        </h3>
        <button
          onClick={runPipeline}
          disabled={isRunning}
          className="flex items-center gap-2 font-syne font-semibold px-4 py-2 transition-all hover:opacity-90 disabled:opacity-50"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--base)",
            borderRadius: "8px",
          }}
        >
          <Play size={16} fill="currentColor" />
          Run pipeline
        </button>
      </div>

      <div className="w-full overflow-x-auto pb-8">
        <div className="flex items-center justify-start min-w-[800px]">
          {nodes.map((node, i) => {
            const Icon = node.icon;
            const isActive = activeNodeIndex >= i;
            const isCurrentlyActive = activeNodeIndex === i;

            return (
              <div key={node.id} className="flex items-center z-10 relative">
                {/* Node Box */}
                <div
                  className={`flex flex-col items-center justify-center transition-all duration-300
                    ${isCurrentlyActive ? "node-glow" : ""}
                  `}
                  style={{
                    width: "120px",
                    height: "64px",
                    backgroundColor: "var(--surface-2)",
                    border: `1px solid ${isActive ? "var(--accent)" : "var(--border)"}`,
                    borderRadius: "12px",
                  }}
                >
                  <Icon
                    size={20}
                    className="mb-1 transition-colors duration-300"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--text-3)",
                    }}
                  />
                  <span
                    className="font-mono text-xs transition-colors duration-300 whitespace-nowrap"
                    style={{
                      color: isActive ? "var(--text-1)" : "var(--text-3)",
                    }}
                  >
                    {node.label}
                  </span>
                </div>

                {/* Connecting SVG Line (skip for last node) */}
                {i < nodes.length - 1 && (
                  <div className="w-[40px] flex items-center justify-center -mx-1 relative z-0">
                    <svg
                      width="48"
                      height="24"
                      className={`transition-opacity duration-300 ${
                        activeNodeIndex >= i ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      <line
                        x1="0"
                        y1="12"
                        x2="48"
                        y2="12"
                        className="dash-line"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {true && (
        <div 
          className={`h-8 flex items-center justify-center text-ai transition-all duration-500 transform ${
            isSuccess ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {isSuccess ? (
            <div className="flex items-center gap-2 font-mono text-sm bg-[#1D9E7515] px-4 py-2 rounded-full border border-[#1D9E7540]">
              <CheckCircle2 size={16} />
              ✓ 1 lead processed · CRM updated · Slack notified
            </div>
          ) : <div className="h-[38px]"></div>}
        </div>
      )}
    </div>
  );
}
