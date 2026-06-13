import Link from "next/link";
import type { ContentMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import TagLink from "./TagLink";

const catColors: Record<string, { text: string; bg: string }> = {
  Backend: { text: "text-blue-300", bg: "bg-blue-950" },
  Frontend: { text: "text-pink-300", bg: "bg-pink-950" },
  "Banco de Dados": { text: "text-orange-300", bg: "bg-orange-950" },
  DevOps: { text: "text-cyan-300", bg: "bg-cyan-950" },
  Arquitetura: { text: "text-amber-300", bg: "bg-amber-950" },
  Carreira: { text: "text-emerald-300", bg: "bg-emerald-950" },
  Algoritmos: { text: "text-red-300", bg: "bg-red-950" },
  "System Design": { text: "text-violet-300", bg: "bg-violet-950" },
  "Design Patterns": { text: "text-fuchsia-300", bg: "bg-fuchsia-950" },
  "Princípios SOLID": { text: "text-emerald-300", bg: "bg-emerald-950" },
  "Resiliência de Sistemas": { text: "text-indigo-300", bg: "bg-indigo-950" },
  OKRs: { text: "text-rose-300", bg: "bg-rose-950" },
};

export default function ContentCard({ content }: { content: ContentMeta }) {
  const colors = catColors[content.category] ?? {
    text: "text-green-300",
    bg: "bg-green-950",
  };

  return (
    <Link
      href={`/${content.categorySlug}/${content.slug}`}
      className="group block p-5 bg-card border border-slate-700 rounded-xl hover:border-slate-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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
          <TagLink
            key={tag}
            tag={tag}
            className="text-xs text-text-secondary bg-slate-700 hover:bg-accent-hover hover:text-accent px-2 py-0.5 rounded"
          />
        ))}
      </div>
      <p className="text-xs text-text-secondary mt-3">
        {content.publishedAt ? formatDate(content.publishedAt) : ""}
      </p>
    </Link>
  );
}
