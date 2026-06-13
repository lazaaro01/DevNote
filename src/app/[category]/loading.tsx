export default function CategoryLoading() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-8">
        <div className="h-8 w-48 rounded-lg bg-slate-800 animate-pulse mb-3" />
        <div className="h-4 w-96 rounded bg-slate-800 animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-5 w-16 rounded-full bg-slate-800 animate-pulse" />
              <div className="h-3 w-20 rounded bg-slate-800 animate-pulse" />
            </div>
            <div className="h-5 w-3/4 rounded bg-slate-800 animate-pulse mb-2" />
            <div className="space-y-1.5 mb-3">
              <div className="h-3 w-full rounded bg-slate-800 animate-pulse" />
              <div className="h-3 w-4/5 rounded bg-slate-800 animate-pulse" />
            </div>
            <div className="flex gap-1.5">
              <div className="h-5 w-14 rounded-full bg-slate-800 animate-pulse" />
              <div className="h-5 w-18 rounded-full bg-slate-800 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
