import ContentCard from "@/components/ContentCard";
import { getContentList } from "@/lib/content";
import type { ContentMeta } from "@/lib/types";
import Fuse from "fuse.js";

export default async function SearchResults({
  query,
}: {
  query: string;
}) {
  const allContent = getContentList();

  if (!query.trim()) {
    return (
      <p className="text-text-secondary">
        Digite um termo para buscar nos conteúdos.
      </p>
    );
  }

  const fuse = new Fuse(allContent, {
    keys: [
      { name: "title", weight: 3 },
      { name: "description", weight: 2 },
      { name: "category", weight: 1 },
      { name: "tags", weight: 2 },
    ],
    threshold: 0.4,
    distance: 100,
    ignoreLocation: true,
  });

  const fuseResults = fuse.search(query);
  const results: ContentMeta[] = fuseResults.map((r) => r.item);

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
