"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function ViewToggle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const view = searchParams.get("view") === "list" ? "list" : "grid";

  function toggle(v: "grid" | "list") {
    const params = new URLSearchParams(searchParams.toString());
    if (v === "list") {
      params.set("view", "list");
    } else {
      params.delete("view");
    }
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex items-center gap-1 bg-slate-700 rounded-lg p-0.5">
      <button
        onClick={() => toggle("grid")}
        className={`p-1.5 rounded-md transition-colors ${
          view === "grid" ? "bg-slate-600 shadow-sm text-text" : "text-text-secondary hover:text-text"
        }`}
        title="Visualização em grade"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      </button>
      <button
        onClick={() => toggle("list")}
        className={`p-1.5 rounded-md transition-colors ${
          view === "list" ? "bg-slate-600 shadow-sm text-text" : "text-text-secondary hover:text-text"
        }`}
        title="Visualização em lista"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  );
}
