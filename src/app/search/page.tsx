import { Suspense } from "react";
import SearchResults from "./SearchResults";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <h1 className="text-2xl font-bold text-text mb-2">Resultados da Busca</h1>
      <p className="text-text-secondary mb-8">
        {q ? `Mostrando resultados para "${q}"` : "Digite um termo para pesquisar"}
      </p>
      <Suspense fallback={<p className="text-text-secondary">Buscando...</p>}>
        <SearchResults query={q ?? ""} />
      </Suspense>
    </div>
  );
}
