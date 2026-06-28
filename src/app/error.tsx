"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
      <div className="mb-8">
        <div className="text-6xl font-bold text-red-400 mb-4">!</div>
        <h1 className="text-2xl font-bold text-text mb-3">
          Algo deu errado
        </h1>
        <p className="text-text-secondary leading-relaxed mb-8">
          Ocorreu um erro inesperado ao carregar esta página. Tente novamente
          ou volte para a página inicial.
        </p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-accent text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
        >
          Tentar novamente
        </button>
        <a
          href="/"
          className="px-5 py-2.5 border border-slate-700 text-text-secondary rounded-xl hover:text-text hover:border-slate-600 transition-colors font-medium"
        >
          Voltar para Home
        </a>
      </div>
    </div>
  );
}
