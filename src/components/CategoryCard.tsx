import Link from "next/link";
import type { CategoryInfo } from "@/lib/types";
import { icons } from "./icons";

const catStyles: Record<string, { gradient: string; color: string; shadow: string }> = {
  backend: { gradient: "from-blue-500/10 to-blue-600/5", color: "#3b82f6", shadow: "shadow-blue-500/20" },
  frontend: { gradient: "from-pink-500/10 to-pink-600/5", color: "#ec4899", shadow: "shadow-pink-500/20" },
  database: { gradient: "from-orange-500/10 to-orange-600/5", color: "#f97316", shadow: "shadow-orange-500/20" },
  devops: { gradient: "from-cyan-500/10 to-cyan-600/5", color: "#06b6d4", shadow: "shadow-cyan-500/20" },
  architecture: { gradient: "from-amber-500/10 to-amber-600/5", color: "#f59e0b", shadow: "shadow-amber-500/20" },
  career: { gradient: "from-emerald-500/10 to-emerald-600/5", color: "#10b981", shadow: "shadow-emerald-500/20" },
  algorithms: { gradient: "from-red-500/10 to-red-600/5", color: "#ef4444", shadow: "shadow-red-500/20" },
  "system-design": { gradient: "from-violet-500/10 to-violet-600/5", color: "#8b5cf6", shadow: "shadow-violet-500/20" },
  "design-patterns": { gradient: "from-fuchsia-500/10 to-fuchsia-600/5", color: "#d946ef", shadow: "shadow-fuchsia-500/20" },
  solid: { gradient: "from-emerald-600/10 to-emerald-700/5", color: "#059669", shadow: "shadow-emerald-600/20" },
  resiliencia: { gradient: "from-indigo-500/10 to-indigo-600/5", color: "#6366f1", shadow: "shadow-indigo-500/20" },
  okrs: { gradient: "from-rose-500/10 to-rose-600/5", color: "#f43f5e", shadow: "shadow-rose-500/20" },
};

export default function CategoryCard({ category }: { category: CategoryInfo }) {
  const style = catStyles[category.slug] ?? { gradient: "from-slate-500/10 to-slate-600/5", color: "#64748b", shadow: "shadow-slate-500/20" };
  const Icon = icons[category.slug] ?? icons.backend;

  return (
    <Link
      href={`/${category.slug}`}
      className={`group relative flex items-center gap-4 p-4 bg-card border border-slate-700 rounded-xl hover:shadow-lg hover:border-transparent transition-all duration-300 hover:-translate-y-0.5 ${style.shadow} hover:shadow-xl`}
    >
      <div
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 group-hover:bg-white/10 transition-colors duration-300" style={{ color: style.color }}>
        <Icon size={20} />
      </div>
      <div className="relative">
        <h3 className="font-semibold text-text group-hover:text-accent transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-text-secondary">
          {category.count} {category.count === 1 ? "conteúdo" : "conteúdos"}
        </p>
      </div>
      <svg
        className="relative w-4 h-4 ml-auto text-slate-500 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
