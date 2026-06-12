import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CategoryCard from "@/components/CategoryCard";
import ContentCard from "@/components/ContentCard";
import { getCategories, getContentList } from "@/lib/content";

export default function Home() {
  const categories = getCategories();
  const allContent = getContentList();
  const featured = allContent.filter((c) => c.featured);
  const recent = allContent.slice(0, 6);

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Hero />
      <SearchBar />

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-text mb-4">Categorias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-text mb-4">
            Conteúdos em Destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featured.map((content) => (
              <ContentCard key={`${content.category}-${content.slug}`} content={content} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold text-text mb-4">
          Conteúdos Recentes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recent.map((content) => (
            <ContentCard key={`${content.category}-${content.slug}`} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
}
