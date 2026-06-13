export default function TutorialTemplate() {
  return (
    <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/50 p-5 text-sm">
      <p className="font-semibold text-text mb-2 flex items-center gap-2">
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        Tutorial
      </p>
      <p className="text-text-secondary leading-relaxed">
        Este conteúdo é um tutorial passo a passo. Siga as seções em ordem para obter o melhor resultado.
      </p>
    </div>
  );
}
