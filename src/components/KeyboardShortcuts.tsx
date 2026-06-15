"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const shortcuts = [
  { key: "/", desc: "Focar na busca" },
  { key: "?", desc: "Abrir atalhos" },
  { key: "P", desc: "Alternar modo apresentação" },
  { key: "C", desc: "Alternar alto contraste" },
  { key: "ESC", desc: "Fechar modal / limpar busca" },
] as const;

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        if (e.key === "Escape") {
          (e.target as HTMLElement).blur();
        }
        return;
      }

      if (e.key === "/") {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(
          'input[type="text"]'
        );
        input?.focus();
      }

      if (e.key === "?" && !e.shiftKey) {
        e.preventDefault();
        setOpen(true);
      }

      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-30 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 shadow-sm text-sm font-bold text-text-secondary hover:text-accent hover:border-accent hover:shadow-md transition-all duration-200 flex items-center justify-center"
        title="Atalhos do teclado (?)"
        aria-label="Atalhos do teclado"
      >
        ?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        >
          <div
            className="bg-slate-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-text">Atalhos</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-text-secondary hover:text-text transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-2">
              {shortcuts.map((s) => (
                <li key={s.key} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{s.desc}</span>
                  <kbd className="text-xs font-mono bg-slate-700 text-text border border-slate-600 px-2 py-0.5 rounded">
                    {s.key}
                  </kbd>
                </li>
              ))}
            </ul>
            <p className="text-xs text-text-secondary mt-4 text-center">
              Pressione <kbd className="text-xs font-mono bg-slate-700 px-1.5 py-0.5 rounded border border-slate-600">?</kbd> a qualquer momento para abrir
            </p>
          </div>
        </div>
      )}
    </>
  );
}
