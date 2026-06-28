"use client";

import { useEffect, useState, useRef } from "react";
import SidebarContent from "./SidebarContent";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { CategoryInfo } from "@/lib/types";

export default function MobileMenu({ categories }: { categories: CategoryInfo[] }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);

  useFocusTrap(open, panelRef);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="mobile-menu-toggle fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-white/80 shadow-lg hover:bg-slate-700 hover:text-white transition-all"
        aria-label="Abrir menu"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
          aria-hidden="true"
        />
      )}

      <aside
        id="mobile-menu-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navegação principal"
        className={`fixed top-0 left-0 z-50 h-full w-64 flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Fechar menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <SidebarContent categories={categories} />
      </aside>
    </div>
  );
}
