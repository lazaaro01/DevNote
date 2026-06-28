"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "devvault-reactions";

type Reaction = "like" | "dislike" | null;

function loadReactions(): Record<string, Reaction> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export default function ArticleReactions({ slug }: { slug: string }) {
  const [reaction, setReaction] = useState<Reaction>(null);

  useEffect(() => {
    const all = loadReactions();
    if (all[slug]) setReaction(all[slug]);
  }, [slug]);

  const handleReaction = useCallback(
    (value: Reaction) => {
      const all = loadReactions();
      const next = reaction === value ? null : value;
      if (next) {
        all[slug] = next;
      } else {
        delete all[slug];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      setReaction(next);
    },
    [slug, reaction]
  );

  return (
    <section className="border-t border-slate-700 pt-8 mt-8">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-text-secondary">Este artigo foi útil?</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleReaction("like")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              reaction === "like"
                ? "bg-emerald-950 text-emerald-400 border border-emerald-700"
                : "bg-slate-800 text-text-secondary border border-slate-700 hover:bg-slate-700"
            }`}
          >
            <svg className="w-4 h-4" fill={reaction === "like" ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            Útil
          </button>
          <button
            onClick={() => handleReaction("dislike")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              reaction === "dislike"
                ? "bg-red-950 text-red-400 border border-red-700"
                : "bg-slate-800 text-text-secondary border border-slate-700 hover:bg-slate-700"
            }`}
          >
            <svg className="w-4 h-4" fill={reaction === "dislike" ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
            </svg>
            Não Útil
          </button>
        </div>
      </div>
    </section>
  );
}
