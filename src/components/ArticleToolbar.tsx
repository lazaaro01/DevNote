"use client";

import { useEffect, useState, useCallback } from "react";

type LayoutOption = "default" | "full-width" | "reading";
type ThemeOption =
  | ""
  | "violet"
  | "blue"
  | "emerald"
  | "amber"
  | "rose"
  | "cyan"
  | "orange"
  | "pink"
  | "indigo"
  | "red"
  | "fuchsia";

interface Prefs {
  layout: LayoutOption;
  theme: ThemeOption;
}

const STORAGE_KEY = "devvault-article-prefs";
const DEFAULT_PREFS: Prefs = { layout: "default", theme: "" };

const layouts: { value: LayoutOption; label: string; icon: string }[] = [
  { value: "default", label: "Padrão", icon: "📄" },
  { value: "full-width", label: "Largo", icon: "📐" },
  { value: "reading", label: "Leitura", icon: "📖" },
];

const themes: { value: ThemeOption; color: string; label: string }[] = [
  { value: "", color: "#22c55e", label: "Padrão" },
  { value: "violet", color: "#8b5cf6", label: "Violeta" },
  { value: "blue", color: "#3b82f6", label: "Azul" },
  { value: "emerald", color: "#10b981", label: "Esmeralda" },
  { value: "amber", color: "#f59e0b", label: "Âmbar" },
  { value: "rose", color: "#f43f5e", label: "Rosa" },
  { value: "cyan", color: "#06b6d4", label: "Ciano" },
  { value: "orange", color: "#f97316", label: "Laranja" },
  { value: "pink", color: "#ec4899", label: "Pink" },
  { value: "indigo", color: "#6366f1", label: "Índigo" },
  { value: "red", color: "#ef4444", label: "Vermelho" },
  { value: "fuchsia", color: "#d946ef", label: "Fúcsia" },
];

export default function ArticleToolbar() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Prefs;
        setPrefs(parsed);
        applyOverrides(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const applyOverrides = useCallback((p: Prefs) => {
    const root = document.getElementById("article-root");
    if (!root) return;
    root.setAttribute("data-layout-override", p.layout);
    root.setAttribute("data-theme-override", p.theme);
  }, []);

  const handleLayout = (layout: LayoutOption) => {
    const next = { ...prefs, layout };
    setPrefs(next);
    saveAndApply(next);
  };

  const handleTheme = (theme: ThemeOption) => {
    const next = { ...prefs, theme };
    setPrefs(next);
    saveAndApply(next);
  };

  const handleReset = () => {
    const next = { ...DEFAULT_PREFS };
    setPrefs(next);
    const root = document.getElementById("article-root");
    if (root) {
      root.removeAttribute("data-layout-override");
      root.removeAttribute("data-theme-override");
    }
    localStorage.removeItem(STORAGE_KEY);
  };

  const saveAndApply = (p: Prefs) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    applyOverrides(p);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50 print-hidden">
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="relative z-50">
        {open && (
          <div className="absolute bottom-16 right-0 w-72 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl p-4 animate-scale-in">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-text">
                Personalizar
              </p>
              <button
                onClick={handleReset}
                className="text-xs text-text-secondary hover:text-text transition-colors"
              >
                Resetar
              </button>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                Layout
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {layouts.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => handleLayout(l.value)}
                    className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs transition-all ${
                      prefs.layout === l.value
                        ? "bg-slate-700 text-text ring-1 ring-slate-500"
                        : "bg-slate-800 text-text-secondary hover:bg-slate-700"
                    }`}
                  >
                    <span className="text-base">{l.icon}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2">
                Tema
              </p>
              <div className="grid grid-cols-6 gap-2">
                {themes.map((t) => (
                  <button
                    key={t.value || "__default"}
                    onClick={() => handleTheme(t.value)}
                    className={`w-7 h-7 rounded-full transition-all ${
                      prefs.theme === t.value
                        ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110"
                        : "hover:scale-110"
                    }`}
                    style={{ background: t.color }}
                    title={t.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 border border-slate-700 text-xl shadow-lg hover:bg-slate-700 hover:scale-105 transition-all"
          title="Personalizar aparência"
        >
          🎨
        </button>
      </div>
    </div>
  );
}
