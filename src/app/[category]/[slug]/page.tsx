import { notFound } from "next/navigation";
import Link from "next/link";
import MDXContent from "@/components/MDXContent";
import ContentCard from "@/components/ContentCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import TOC from "@/components/TOC";
import PrintButton from "@/components/PrintButton";
import TagLink from "@/components/TagLink";
import {
  getContent,
  getRelatedContent,
  getContentList,
  getCategories,
} from "@/lib/content";
import { formatDate } from "@/lib/utils";

const catBadge: Record<string, { text: string; bg: string; border: string }> = {
  backend: { text: "text-blue-300", bg: "bg-blue-950", border: "border-blue-700" },
  frontend: { text: "text-pink-300", bg: "bg-pink-950", border: "border-pink-700" },
  database: { text: "text-orange-300", bg: "bg-orange-950", border: "border-orange-700" },
  devops: { text: "text-cyan-300", bg: "bg-cyan-950", border: "border-cyan-700" },
  architecture: { text: "text-amber-300", bg: "bg-amber-950", border: "border-amber-700" },
  career: { text: "text-emerald-300", bg: "bg-emerald-950", border: "border-emerald-700" },
  algorithms: { text: "text-red-300", bg: "bg-red-950", border: "border-red-700" },
  "system-design": { text: "text-violet-300", bg: "bg-violet-950", border: "border-violet-700" },
  "design-patterns": { text: "text-fuchsia-300", bg: "bg-fuchsia-950", border: "border-fuchsia-700" },
  solid: { text: "text-emerald-300", bg: "bg-emerald-950", border: "border-emerald-700" },
  resiliencia: { text: "text-indigo-300", bg: "bg-indigo-950", border: "border-indigo-700" },
  okrs: { text: "text-rose-300", bg: "bg-rose-950", border: "border-rose-700" },
};

const tagColors = [
  { text: "text-blue-300", bg: "bg-blue-950" },
  { text: "text-violet-300", bg: "bg-violet-950" },
  { text: "text-emerald-300", bg: "bg-emerald-950" },
  { text: "text-amber-300", bg: "bg-amber-950" },
  { text: "text-rose-300", bg: "bg-rose-950" },
  { text: "text-cyan-300", bg: "bg-cyan-950" },
  { text: "text-pink-300", bg: "bg-pink-950" },
  { text: "text-indigo-300", bg: "bg-indigo-950" },
];

export function generateStaticParams() {
  const categories = getCategories();
  const params: { category: string; slug: string }[] = [];

  for (const cat of categories) {
    const contents = getContentList(cat.slug);
    for (const c of contents) {
      params.push({ category: cat.slug, slug: c.slug });
    }
  }

  return params;
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const content = getContent(category, slug);

  if (!content) notFound();

  const related = getRelatedContent(category, slug);
  const badge = catBadge[category] ?? {
    text: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  };

  return (
    <div className="max-w-6xl mx-auto px-8 py-12 flex gap-8">
        <article className="min-w-0 flex-1 max-w-3xl">
          <Breadcrumbs
            items={[
              { label: content.category, href: `/${category}` },
              { label: content.title },
            ]}
          />

          <header className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Link
                href={`/${category}`}
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full border transition-colors ${badge.text} ${badge.bg} ${badge.border} hover:opacity-80`}
              >
                {content.category}
              </Link>
              <span className="text-xs text-text-secondary">
                {content.readingTime} min de leitura
              </span>
              <span className="text-xs text-text-secondary">
                {formatDate(content.publishedAt)}
              </span>
              <div className="ml-auto print-hidden">
                <PrintButton />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-text tracking-tight mb-3">
              {content.title}
            </h1>
            <p className="text-text-secondary leading-relaxed">
              {content.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {content.tags.map((tag, i) => {
                const tc = tagColors[i % tagColors.length];
                return (
                  <TagLink
                    key={tag}
                    tag={tag}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer transition-colors ${tc.text} ${tc.bg} hover:opacity-80`}
                  />
                );
              })}
            </div>
          </header>

          <div className="mb-12">
            <MDXContent source={content.content} />
          </div>

          {related.length > 0 && (
            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-lg font-semibold text-text mb-4">
                Conteúdos Relacionados
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((item) => (
                  <ContentCard key={item.slug} content={item} />
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="hidden xl:block w-56 flex-shrink-0">
          <TOC markdown={content.content} />
        </aside>
      </div>
    );
}
