"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "devvault-visited";

export default function FirstVisitHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem(STORAGE_KEY);
    if (!visited) {
      const showTimer = setTimeout(() => setVisible(true), 5000);
      const hideTimer = setTimeout(() => setVisible(false), 15000);
      localStorage.setItem(STORAGE_KEY, "true");
      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-24 right-6 z-40 animate-fade-in-up cursor-pointer"
      onClick={() => setVisible(false)}
    >
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 max-w-xs animate-scale-in">
        <div className="flex items-start gap-3">
          <span className="text-lg mt-0.5">💡</span>
          <div>
            <p className="text-sm text-text font-medium">
              Pressione <kbd className="text-xs font-mono bg-slate-700 text-text border border-slate-600 px-1.5 py-0.5 rounded">?</kbd> para ver os atalhos do teclado
            </p>
            <p className="text-xs text-text-secondary mt-1">
              Navegue mais rápido pelo sistema.
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setVisible(false); }}
            className="text-text-secondary hover:text-text transition-colors ml-auto shrink-0"
            aria-label="Fechar dica"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
