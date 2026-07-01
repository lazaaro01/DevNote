"use client";

import { useEffect, useRef, useId, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  themeVariables: {
    primaryColor: "#8b5cf6",
    primaryTextColor: "#f1f5f9",
    primaryBorderColor: "#6d28d9",
    lineColor: "#64748b",
    secondaryColor: "#1e293b",
    tertiaryColor: "#0f172a",
    fontSize: "14px",
  },
});

export default function MermaidRenderer({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!chart.trim()) return;
    setError(false);
    const render = async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${id.replace(/[:.]/g, "-")}`, chart);
        if (ref.current) ref.current.innerHTML = svg;
      } catch {
        setError(true);
      }
    };
    render();
  }, [chart, id]);

  if (error) {
    return (
      <div className="my-6 rounded-xl border border-red-800 bg-red-950/50 p-4 text-sm text-red-300">
        <p className="font-semibold mb-1">Erro ao renderizar diagrama</p>
        <pre className="text-red-400/70 text-xs whitespace-pre-wrap">{chart}</pre>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="my-6 rounded-xl border border-slate-300 bg-white p-4 flex justify-center overflow-x-auto"
    />
  );
}
