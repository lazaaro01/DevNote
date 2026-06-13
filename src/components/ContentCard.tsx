import Link from "next/link";
import type { ContentMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const catColors: Record<string, { text: string; bg: string }> = {
  Backend: { text: "text-blue-600", bg: "bg-blue-50" },
  Frontend: { text: "text-pink-600", bg: "bg-pink-50" },
  "Banco de Dados": { text: "text-orange-600", bg: "bg-orange-50" },
  DevOps: { text: "text-cyan-600", bg: "bg-cyan-50" },
  Arquitetura: { text: "text-amber-600", bg: "bg-amber-50" },
  Carreira: { text: "text-emerald-600", bg: "bg-emerald-50" },
  Algoritmos: { text: "text-red-600", bg: "bg-red-50" },
  "System Design": { text: "text-violet-600", bg: "bg-violet-50" },
  "Design Patterns": { text: "text-fuchsia-600", bg: "bg-fuchsia-50" },
  "Princípios SOLID": { text: "text-emerald-600", bg: "bg-emerald-50" },
  "Resiliência de Sistemas": { text: "text-indigo-600", bg: "bg-indigo-50" },
  OKRs: { text: "text-rose-600", bg: "bg-rose-50" },
};

export default function ContentCard({ content }: { content: ContentMeta }) {
  const colors = catColors[content.category] ?? {
    text: "text-green-600",
    bg: "bg-green-50",
  };

  return (
    <Link
      href={`/${content.categorySlug}/${content.slug}`}
      className="group block p-5 bg-card border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colors.text} ${colors.bg}`}
        >
          {content.category}
        </span>
        <span className="text-xs text-text-secondary">
          {content.readingTime} min de leitura
        </span>
      </div>
      <h3 className="font-semibold text-text group-hover:text-accent transition-colors mb-1.5">
        {content.title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
        {content.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {content.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs text-text-secondary bg-slate-100 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="text-xs text-text-secondary mt-3">
        {content.publishedAt ? formatDate(content.publishedAt) : ""}
      </p>
    </Link>
  );
}
