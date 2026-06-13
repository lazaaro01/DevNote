export default function Hero() {
  return (
    <section className="relative mb-14 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 p-8 md:p-10 animate-gradient">
      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 drop-shadow-sm">
          Biblioteca de Conhecimento Técnico
        </h1>
        <p className="text-base md:text-lg text-white/85 max-w-2xl leading-relaxed">
          Anotações, estudos e documentações organizadas por categorias para
          consulta rápida. Explore conteúdos sobre desenvolvimento de software,
          arquitetura, banco de dados e muito mais.
        </p>
      </div>

      <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-xl" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-xl" />
      <div className="absolute top-1/2 right-12 w-20 h-20 bg-white/10 rounded-full blur-lg animate-float" />
    </section>
  );
}
