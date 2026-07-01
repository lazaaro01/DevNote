import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import MDXContent from "@/components/MDXContent";
import ContentCard from "@/components/ContentCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import PrintButton from "@/components/PrintButton";
import TagLink from "@/components/TagLink";
import LayoutSwitcher from "@/components/layouts/LayoutSwitcher";
import TemplateRenderer from "@/components/templates/TemplateRenderer";
import ArticleToolbar from "@/components/ArticleToolbar";
import ArticleReactions from "@/components/ArticleReactions";
import Lightbox from "@/components/Lightbox";
import BackToTop from "@/components/BackToTop";
import {
  getContent,
  getRelatedContent,
  getContentList,
  getCategories,
  getSeriesContent,
} from "@/lib/content";
import { formatDate } from "@/lib/utils";

const catBadge: Record<string, { text: string; bg: string; border: string }> = {
  backend: { text: "text-blue-600", bg: "bg-blue-100", border: "border-blue-300" },
  frontend: { text: "text-pink-600", bg: "bg-pink-100", border: "border-pink-300" },
  database: { text: "text-orange-600", bg: "bg-orange-100", border: "border-orange-300" },
  devops: { text: "text-cyan-600", bg: "bg-cyan-100", border: "border-cyan-300" },
  architecture: { text: "text-amber-600", bg: "bg-amber-100", border: "border-amber-300" },
  career: { text: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-300" },
  cloud: { text: "text-sky-600", bg: "bg-sky-100", border: "border-sky-300" },
  mensageria: { text: "text-teal-600", bg: "bg-teal-100", border: "border-teal-300" },
  "system-design": { text: "text-violet-600", bg: "bg-violet-100", border: "border-violet-300" },
  "design-patterns": { text: "text-fuchsia-600", bg: "bg-fuchsia-100", border: "border-fuchsia-300" },
  solid: { text: "text-emerald-600", bg: "bg-emerald-100", border: "border-emerald-300" },
  resiliencia: { text: "text-indigo-600", bg: "bg-indigo-100", border: "border-indigo-300" },
  okrs: { text: "text-rose-600", bg: "bg-rose-100", border: "border-rose-300" },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const content = getContent(category, slug);
  if (!content) return {};

  const ogUrl = `/api/og?title=${encodeURIComponent(content.title)}&category=${encodeURIComponent(content.category)}&theme=${content.theme ?? ""}`;

  return {
    openGraph: {
      title: content.title,
      description: content.description,
      url: `/${category}/${slug}`,
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: [ogUrl],
    },
  };
}

const tagColors = [
  { text: "text-blue-600", bg: "bg-blue-100" },
  { text: "text-violet-600", bg: "bg-violet-100" },
  { text: "text-emerald-600", bg: "bg-emerald-100" },
  { text: "text-amber-600", bg: "bg-amber-100" },
  { text: "text-rose-600", bg: "bg-rose-100" },
  { text: "text-cyan-600", bg: "bg-cyan-100" },
  { text: "text-pink-600", bg: "bg-pink-100" },
  { text: "text-indigo-600", bg: "bg-indigo-100" },
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
  searchParams,
}: {
  params: Promise<{ category: string; slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}) {
  const { category, slug } = await params;
  const { preview } = await searchParams;
  const isPreview = preview === "true";
  const content = getContent(category, slug, isPreview);

  if (!content) notFound();

  const related = getRelatedContent(category, slug);
  const badge = catBadge[category] ?? {
    text: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  };

  const themeClass = content.theme ? `theme-${content.theme}` : "";
  const layout = content.layout;

  const seriesItems = content.series ? getSeriesContent(content.series) : [];
  const currentSeriesIndex = seriesItems.findIndex((s) => s.slug === slug);
  const prevSeries = currentSeriesIndex > 0 ? seriesItems[currentSeriesIndex - 1] : null;
  const nextSeries = currentSeriesIndex < seriesItems.length - 1 ? seriesItems[currentSeriesIndex + 1] : null;

  return (
      <div id="article-root" className={themeClass}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: content.title,
            description: content.description,
            datePublished: content.publishedAt,
            author: { "@type": "Person", name: "DevVault" },
            publisher: { "@type": "Person", name: "DevVault" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `/${category}/${slug}` },
            keywords: content.tags.join(", "),
            ...(content.series ? { isPartOf: { "@type": "Series", name: content.series } } : {}),
          }),
        }}
      />
      <LayoutSwitcher layout={layout} tocContent={content.content}>
        <Breadcrumbs
          items={[
            { label: content.category, href: `/${category}` },
            { label: content.title },
          ]}
        />

        <header className="mb-8">
          {content.draft && (
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-300">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Rascunho — não publicado
            </div>
          )}
          {content.series && (
            <div className="mb-4 text-xs text-text-secondary">
              Série: <span className="font-semibold text-text">{content.series}</span>
              {content.seriesOrder && <span className="ml-1">· Parte {content.seriesOrder}</span>}
            </div>
          )}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
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
          <h1 className="text-2xl md:text-3xl font-bold text-text tracking-tight mb-3">
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
          <TemplateRenderer template={content.template} />
          <MDXContent source={content.content} />
        </div>

        <ArticleReactions slug={slug} />

        {seriesItems.length > 1 && (
          <section className="border-t border-slate-700 pt-8 mb-8">
            <h2 className="text-lg font-semibold text-text mb-4">
              Série: {content.series}
            </h2>
            <div className="flex items-center justify-between gap-4">
              {prevSeries ? (
                <Link
                  href={`/${prevSeries.categorySlug}/${prevSeries.slug}`}
                  className="flex items-center gap-2 text-sm text-accent hover:underline group"
                >
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="truncate">{prevSeries.title}</span>
                </Link>
              ) : <div />}
              {nextSeries ? (
                <Link
                  href={`/${nextSeries.categorySlug}/${nextSeries.slug}`}
                  className="flex items-center gap-2 text-sm text-accent hover:underline group"
                >
                  <span className="truncate">{nextSeries.title}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : <div />}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="border-t border-slate-700 pt-8">
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
      </LayoutSwitcher>
      <BackToTop />
      <ArticleToolbar />
      <Lightbox />
    </div>
  );
}
