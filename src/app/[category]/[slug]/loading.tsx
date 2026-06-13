export default function ArticleLoading() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-12 flex gap-8">
      <article className="min-w-0 flex-1 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-5 w-20 rounded-full bg-slate-800 animate-pulse" />
          <div className="h-3 w-28 rounded bg-slate-800 animate-pulse" />
          <div className="h-3 w-24 rounded bg-slate-800 animate-pulse" />
        </div>

        <div className="h-10 w-3/4 rounded-lg bg-slate-800 animate-pulse mb-4" />

        <div className="space-y-2 mb-6">
          <div className="h-4 w-full rounded bg-slate-800 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-slate-800 animate-pulse" />
        </div>

        <div className="flex gap-2 mb-12">
          <div className="h-6 w-16 rounded-full bg-slate-800 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-slate-800 animate-pulse" />
          <div className="h-6 w-14 rounded-full bg-slate-800 animate-pulse" />
        </div>

        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-slate-800 animate-pulse" />
          <div className="h-4 w-full rounded bg-slate-800 animate-pulse" />
          <div className="h-4 w-11/12 rounded bg-slate-800 animate-pulse" />
          <div className="h-4 w-full rounded bg-slate-800 animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-slate-800 animate-pulse" />
          <div className="h-4 w-full rounded bg-slate-800 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-slate-800 animate-pulse" />
          <div className="h-4 w-full rounded bg-slate-800 animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-slate-800 animate-pulse" />
        </div>
      </article>

      <aside className="hidden xl:block w-56 flex-shrink-0">
        <div className="h-3 w-20 rounded bg-slate-800 animate-pulse mb-4" />
        <div className="space-y-2">
          <div className="h-3 w-40 rounded bg-slate-800 animate-pulse" />
          <div className="h-3 w-32 rounded bg-slate-800 animate-pulse" />
          <div className="h-3 w-44 rounded bg-slate-800 animate-pulse" />
          <div className="h-3 w-36 rounded bg-slate-800 animate-pulse" />
        </div>
      </aside>
    </div>
  );
}
