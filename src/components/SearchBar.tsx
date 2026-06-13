"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export default function SearchBar({
  initialValue = "",
}: {
  initialValue?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [query, router]
  );

  return (
    <form onSubmit={handleSubmit} className="w-full mb-10">
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar conteúdos..."
          className="w-full pl-12 pr-4 py-3.5 bg-card border border-slate-700 rounded-xl text-text placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
      </div>
    </form>
  );
}
