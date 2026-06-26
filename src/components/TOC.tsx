"use client";

import { useState } from "react";
import { slugify } from "@/lib/utils";

interface TOCItem {
  level: number;
  text: string;
  id: string;
}

export default function TOC({ markdown }: { markdown: string }) {
  const [open, setOpen] = useState(false);
  const headings = extractHeadings(markdown);

  if (headings.length < 2) return null;

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="xl:hidden flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-text-secondary mb-2"
      >
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Neste artigo
      </button>

      {/* Mobile collapsible */}
      {open && (
        <nav className="xl:hidden mb-6">
          <ul className="space-y-1 border-l-2 border-slate-700">
            {headings.map((h, i) => (
              <li key={i}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setOpen(false)}
                  className={`block text-sm text-text-secondary hover:text-accent hover:border-accent transition-all py-1 -ml-[2px] border-l-2 border-transparent hover:border-accent ${
                    h.level === 3 ? "pl-6" : "pl-4"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* Desktop sidebar */}
      <nav className="sticky top-8 w-56 flex-shrink-0 hidden xl:block">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-4">
          Neste artigo
        </p>
        <ul className="space-y-1 border-l-2 border-slate-700">
          {headings.map((h, i) => (
            <li key={i}>
              <a
                href={`#${h.id}`}
                className={`block text-sm text-text-secondary hover:text-accent hover:border-accent transition-all py-1 -ml-[2px] border-l-2 border-transparent hover:border-accent ${
                  h.level === 3 ? "pl-6" : "pl-4"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function extractHeadings(markdown: string): TOCItem[] {
  const lines = markdown.split("\n");
  const result: TOCItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);
      result.push({ level, text, id });
    }
  }

  return result;
}
