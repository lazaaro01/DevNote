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
import Lightbox from "@/components/Lightbox";
import BackToTop from "@/components/BackToTop";
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
  cloud: { text: "text-sky-300", bg: "bg-sky-950", border: "border-sky-700" },
  mensageria: { text: "text-teal-300", bg: "bg-teal-950", border: "border-teal-700" },
  "system-design": { text: "text-violet-300", bg: "bg-violet-950", border: "border-violet-700" },
  "design-patterns": { text: "text-fuchsia-300", bg: "bg-fuchsia-950", border: "border-fuchsia-700" },
  solid: { text: "text-emerald-300", bg: "bg-emerald-950", border: "border-emerald-700" },
  resiliencia: { text: "text-indigo-300", bg: "bg-indigo-950", border: "border-indigo-700" },
  okrs: { text: "text-rose-300", bg: "bg-rose-950", border: "border-rose-700" },
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

  const themeClass = content.theme ? `theme-${content.theme}` : "";
  const layout = content.layout;

  return (
    <div id="article-root" className={themeClass}>
      <LayoutSwitcher layout={layout} tocContent={content.content}>
        <Breadcrumbs
          items={[
            { label: content.category, href: `/${category}` },
            { label: content.title },
          ]}
        />

        <header className="mb-8">
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
          <TemplateRenderer template={content.template} />
          <MDXContent source={content.content} />
        </div>

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
