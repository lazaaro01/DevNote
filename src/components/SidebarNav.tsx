"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const catColors: Record<string, { dot: string; bg: string }> = {
  backend: { dot: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  frontend: { dot: "#ec4899", bg: "rgba(236,72,153,0.1)" },
  database: { dot: "#f97316", bg: "rgba(249,115,22,0.1)" },
  devops: { dot: "#06b6d4", bg: "rgba(6,182,212,0.1)" },
  architecture: { dot: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  career: { dot: "#10b981", bg: "rgba(16,185,129,0.1)" },
  cloud: { dot: "#0ea5e9", bg: "rgba(14,165,233,0.1)" },
  mensageria: { dot: "#14b8a6", bg: "rgba(20,184,166,0.1)" },
  "system-design": { dot: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
  "design-patterns": { dot: "#d946ef", bg: "rgba(217,70,239,0.1)" },
  solid: { dot: "#059669", bg: "rgba(5,150,105,0.1)" },
  resiliencia: { dot: "#6366f1", bg: "rgba(99,102,241,0.1)" },
  okrs: { dot: "#f43f5e", bg: "rgba(244,63,94,0.1)" },
};

export default function SidebarNav({
  categories,
}: {
  categories: { slug: string; name: string; count: number }[];
}) {
  const pathname = usePathname();

  return (
    <ul className="space-y-0.5">
      {categories.map((cat) => {
        const isActive = pathname === `/${cat.slug}`;
        const colors = catColors[cat.slug] ?? { dot: "#22c55e", bg: "rgba(34,197,94,0.1)" };

        return (
          <li key={cat.slug}>
            <Link
              href={`/${cat.slug}`}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                isActive
                  ? "text-white font-medium shadow-sm"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
              style={isActive ? { background: colors.bg } : {}}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-200"
                  style={{
                    background: colors.dot,
                    boxShadow: isActive ? `0 0 8px ${colors.dot}` : "none",
                    transform: isActive ? "scale(1.2)" : "scale(1)",
                  }}
                />
                <span className="truncate">{cat.name}</span>
              </div>
              <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-full">
                {cat.count}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
