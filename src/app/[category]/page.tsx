import { notFound } from "next/navigation";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryContent from "@/components/CategoryContent";
import { getContentList, getCategories } from "@/lib/content";

const catColors: Record<string, { gradient: string }> = {
  backend: { gradient: "from-blue-500 to-blue-600" },
  frontend: { gradient: "from-pink-500 to-pink-600" },
  database: { gradient: "from-orange-500 to-orange-600" },
  devops: { gradient: "from-cyan-500 to-cyan-600" },
  architecture: { gradient: "from-amber-500 to-amber-600" },
  career: { gradient: "from-emerald-500 to-emerald-600" },
  cloud: { gradient: "from-sky-500 to-sky-600" },
  mensageria: { gradient: "from-teal-500 to-teal-600" },
  "system-design": { gradient: "from-violet-500 to-violet-600" },
  "design-patterns": { gradient: "from-fuchsia-500 to-fuchsia-600" },
  solid: { gradient: "from-emerald-600 to-emerald-700" },
  resiliencia: { gradient: "from-indigo-500 to-indigo-600" },
  okrs: { gradient: "from-rose-500 to-rose-600" },
};

export function generateStaticParams() {
  return getCategories().map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categories = getCategories();
  const catInfo = categories.find((c) => c.slug === category);

  if (!catInfo) notFound();

  const contents = getContentList(category);
  const colors = catColors[category] ?? { gradient: "from-slate-500 to-slate-600" };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Breadcrumbs items={[{ label: catInfo.name }]} />

      <div className={`rounded-2xl bg-gradient-to-r ${colors.gradient} p-8 mb-8`}>
        <h1 className="text-3xl font-bold text-white mb-2">{catInfo.name}</h1>
        <p className="text-white/80">
          {catInfo.count} {catInfo.count === 1 ? "conteúdo" : "conteúdos"} disponíveis
        </p>
      </div>

      {contents.length > 0 ? (
        <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{contents.map((c) => <div key={c.slug} className="h-36 bg-slate-100 rounded-xl animate-pulse" />)}</div>}>
          <CategoryContent contents={contents} />
        </Suspense>
      ) : (
        <p className="text-text-secondary">Nenhum conteúdo encontrado nesta categoria.</p>
      )}
    </div>
  );
}
