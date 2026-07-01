export default function Hero() {
  return (
    <section className="relative mb-10 sm:mb-14 overflow-hidden rounded-2xl bg-transparent p-5 sm:p-8 md:p-10">
      <div className="relative z-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-text mb-3">
          Biblioteca de Conhecimento Técnico
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl leading-relaxed">
          Anotações, estudos e documentações organizadas por categorias para
          consulta rápida. Explore conteúdos sobre desenvolvimento de software,
          arquitetura, banco de dados e muito mais.
        </p>
      </div>

      <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-500/5 rounded-full blur-xl" />
      <div className="absolute top-1/2 right-12 w-20 h-20 bg-emerald-500/10 rounded-full blur-lg animate-float" />
    </section>
  );
}
