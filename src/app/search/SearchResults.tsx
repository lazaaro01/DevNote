import ContentCard from "@/components/ContentCard";
import { getContentList } from "@/lib/content";
import type { ContentMeta } from "@/lib/types";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function SearchResults({
  query,
}: {
  query: string;
}) {
  const allContent = getContentList();
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return (
      <p className="text-text-secondary">
        Digite um termo para buscar nos conteúdos.
      </p>
    );
  }

  const results: ContentMeta[] = allContent.filter((item) => {
    const searchable = [
      item.title,
      item.description,
      item.category,
      ...item.tags,
    ]
      .map(normalize)
      .join(" ");

    return searchable.includes(normalizedQuery);
  });

  if (results.length === 0) {
    return (
      <div className="animate-fade-in">
        <p className="text-text-secondary">
          Nenhum resultado encontrado para &ldquo;{query}&rdquo;.
        </p>
        <p className="text-sm text-text-secondary mt-2">
          Tente termos diferentes ou mais genéricos.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <p className="text-sm text-text-secondary mb-6">
        {results.length}{" "}
        {results.length === 1 ? "resultado encontrado" : "resultados encontrados"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {results.map((content) => (
          <ContentCard key={`${content.categorySlug}-${content.slug}`} content={content} />
        ))}
      </div>
    </div>
  );
}
