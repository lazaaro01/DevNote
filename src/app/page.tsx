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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="animate-fade-in-up stagger-1">
        <Hero />
      </div>

      <div className="animate-fade-in-up stagger-2">
        <SearchBar />
      </div>

      <section className="mb-12 animate-fade-in-up stagger-3">
        <h2 className="text-lg font-semibold text-text mb-4">Categorias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat, i) => (
            <div
              key={cat.slug}
              className={`animate-fade-in-up stagger-${Math.min(i + 1, 10)}`}
            >
              <CategoryCard category={cat} />
            </div>
          ))}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mb-12 animate-fade-in-up stagger-8">
          <h2 className="text-lg font-semibold text-text mb-4">
            Conteúdos em Destaque
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featured.map((content) => (
              <ContentCard
                key={`${content.category}-${content.slug}`}
                content={content}
              />
            ))}
          </div>
        </section>
      )}

      <section className="animate-fade-in-up stagger-9">
        <h2 className="text-lg font-semibold text-text mb-4">
          Conteúdos Recentes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recent.map((content) => (
            <ContentCard
              key={`${content.category}-${content.slug}`}
              content={content}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
