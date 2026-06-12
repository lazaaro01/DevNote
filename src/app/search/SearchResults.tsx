import ContentCard from "@/components/ContentCard";
import { getContentList } from "@/lib/content";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function SearchResults({ query }: { query: string }) {
  if (!query.trim()) {
    return <p className="text-text-secondary">Digite um termo para pesquisar.</p>;
  }

  const allContent = getContentList();
  const normalizedQuery = normalize(query);

  const results = allContent.filter((content) => {
    const title = normalize(content.title);
    const description = normalize(content.description);
    const category = normalize(content.category);
    const tags = content.tags.map((t) => normalize(t));

    return (
      title.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      category.includes(normalizedQuery) ||
      tags.some((tag) => tag.includes(normalizedQuery))
    );
  });

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-secondary text-lg mb-2">Nenhum resultado encontrado</p>
        <p className="text-text-secondary text-sm">
          Tente usar termos diferentes ou verifique a ortografia.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {results.map((content) => (
        <ContentCard key={`${content.category}-${content.slug}`} content={content} />
      ))}
    </div>
  );
}
