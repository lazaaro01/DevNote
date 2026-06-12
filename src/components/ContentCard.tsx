import Link from "next/link";
import type { ContentMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function ContentCard({ content }: { content: ContentMeta }) {
  return (
    <Link
      href={`/${content.categorySlug}/${content.slug}`}
      className="group block p-5 bg-card border border-slate-200 rounded-xl hover:border-accent hover:shadow-sm transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-accent bg-accent-hover px-2 py-0.5 rounded-full">
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
