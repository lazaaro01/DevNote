import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { getCategories } from "@/lib/content";

export default function NotFound() {
  const categories = getCategories();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
      <div className="mb-8">
        <div className="text-6xl font-bold text-accent mb-4">404</div>
        <h1 className="text-2xl font-bold text-text mb-3">
          Página não encontrada
        </h1>
        <p className="text-text-secondary leading-relaxed mb-8">
          A página que você procura não existe, foi movida ou está
          temporariamente indisponível.
        </p>
      </div>

      <div className="mb-10">
        <SearchBar />
      </div>

      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Voltar para Home
        </Link>
      </div>

      <div className="border-t border-slate-700 pt-8">
        <h2 className="text-sm font-semibold text-text mb-4">Categorias</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="text-xs px-3 py-1.5 rounded-full bg-card border border-slate-700 text-text-secondary hover:text-accent hover:border-accent transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
