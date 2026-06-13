import { Suspense } from "react";
import SearchResults from "./SearchResults";
import SearchBar from "@/components/SearchBar";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="animate-fade-in-up stagger-1">
        <SearchBar initialValue={q ?? ""} />
      </div>

      <div className="animate-fade-in-up stagger-2">
        <h1 className="text-2xl font-bold text-text mb-2">
          Resultados da Busca
        </h1>
        {q && (
          <p className="text-text-secondary mb-8">
            Buscando por: <span className="font-medium text-text">&ldquo;{q}&rdquo;</span>
          </p>
        )}
      </div>

      <Suspense
        fallback={
          <p className="text-text-secondary animate-pulse">Buscando...</p>
        }
      >
        <SearchResults query={q ?? ""} />
      </Suspense>
    </div>
  );
}
