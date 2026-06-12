import { notFound } from "next/navigation";
import Link from "next/link";
import MDXContent from "@/components/MDXContent";
import ContentCard from "@/components/ContentCard";
import { getContent, getRelatedContent, getContentList } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  const categories = ["backend", "frontend", "database", "devops", "architecture", "career", "algorithms"];
  const params: { category: string; slug: string }[] = [];

  for (const cat of categories) {
    const contents = getContentList(cat);
    for (const c of contents) {
      params.push({ category: cat, slug: c.slug });
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

  return (
    <article className="max-w-3xl mx-auto px-8 py-12">
      <Link
        href={`/${category}`}
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para {content.category}
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Link
            href={`/${category}`}
            className="text-xs font-medium text-accent bg-accent-hover px-2 py-0.5 rounded-full hover:bg-accent/20 transition-colors"
          >
            {content.category}
          </Link>
          <span className="text-xs text-text-secondary">
            {content.readingTime} min de leitura
          </span>
          <span className="text-xs text-text-secondary">
            {formatDate(content.publishedAt)}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-text tracking-tight mb-3">
          {content.title}
        </h1>
        <p className="text-text-secondary leading-relaxed">
          {content.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {content.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-text-secondary bg-slate-100 px-2.5 py-1 rounded"
            >
              {tag}
            </span>
          ))}
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
  );
}
