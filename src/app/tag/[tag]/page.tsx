import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContentCard from "@/components/ContentCard";
import { getContentList, getContentListByTag } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `Tag: ${decoded}`,
    description: `Conteúdos sobre ${decoded}`,
  };
}

export function generateStaticParams() {
  const allContent = getContentList();
  const tags = new Set<string>();
  for (const item of allContent) {
    for (const tag of item.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const contents = getContentListByTag(decoded);

  if (contents.length === 0) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <Breadcrumbs items={[{ label: `Tag: ${decoded}` }]} />

      <div className="rounded-2xl bg-gradient-to-r from-slate-600 to-slate-700 p-5 sm:p-8 mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{decoded}</h1>
        <p className="text-white/80">
          {contents.length} {contents.length === 1 ? "conteúdo" : "conteúdos"} disponíveis
        </p>
      </div>

      {contents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contents.map((content) => (
            <ContentCard key={`${content.categorySlug}-${content.slug}`} content={content} />
          ))}
        </div>
      ) : (
        <p className="text-text-secondary">Nenhum conteúdo encontrado com esta tag.</p>
      )}
    </div>
  );
}
