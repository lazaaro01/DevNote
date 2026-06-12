import { notFound } from "next/navigation";
import Link from "next/link";
import ContentCard from "@/components/ContentCard";
import { getContentList, getCategories } from "@/lib/content";

export function generateStaticParams() {
  return getCategories().map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categories = getCategories();
  const catInfo = categories.find((c) => c.slug === category);

  if (!catInfo) notFound();

  const contents = getContentList(category);

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Voltar
      </Link>

      <h1 className="text-3xl font-bold text-text mb-2">{catInfo.name}</h1>
      <p className="text-text-secondary mb-8">
        {catInfo.count} {catInfo.count === 1 ? "conteúdo" : "conteúdos"} disponíveis
      </p>

      {contents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contents.map((content) => (
            <ContentCard key={content.slug} content={content} />
          ))}
        </div>
      ) : (
        <p className="text-text-secondary">Nenhum conteúdo encontrado nesta categoria.</p>
      )}
    </div>
  );
}
