import { notFound } from "next/navigation";
import Link from "next/link";
import ContentCard from "@/components/ContentCard";
import { getContentList, getCategories } from "@/lib/content";

const catColors: Record<
  string,
  { gradient: string; text: string }
> = {
  backend: {
    gradient: "from-blue-500 to-blue-600",
    text: "text-blue-600",
  },
  frontend: {
    gradient: "from-pink-500 to-pink-600",
    text: "text-pink-600",
  },
  database: {
    gradient: "from-orange-500 to-orange-600",
    text: "text-orange-600",
  },
  devops: {
    gradient: "from-cyan-500 to-cyan-600",
    text: "text-cyan-600",
  },
  architecture: {
    gradient: "from-amber-500 to-amber-600",
    text: "text-amber-600",
  },
  career: {
    gradient: "from-emerald-500 to-emerald-600",
    text: "text-emerald-600",
  },
  algorithms: {
    gradient: "from-red-500 to-red-600",
    text: "text-red-600",
  },
  "system-design": {
    gradient: "from-violet-500 to-violet-600",
    text: "text-violet-600",
  },
  "design-patterns": {
    gradient: "from-fuchsia-500 to-fuchsia-600",
    text: "text-fuchsia-600",
  },
  solid: {
    gradient: "from-emerald-600 to-emerald-700",
    text: "text-emerald-600",
  },
  resiliencia: {
    gradient: "from-indigo-500 to-indigo-600",
    text: "text-indigo-600",
  },
  okrs: {
    gradient: "from-rose-500 to-rose-600",
    text: "text-rose-600",
  },
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
  const colors = catColors[category] ?? {
    gradient: "from-slate-500 to-slate-600",
    text: "text-slate-600",
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Voltar
      </Link>

      <div
        className={`rounded-2xl bg-gradient-to-r ${colors.gradient} p-8 mb-8`}
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          {catInfo.name}
        </h1>
        <p className="text-white/80">
          {catInfo.count}{" "}
          {catInfo.count === 1 ? "conteúdo" : "conteúdos"} disponíveis
        </p>
      </div>

      {contents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contents.map((content) => (
            <ContentCard key={content.slug} content={content} />
          ))}
        </div>
      ) : (
        <p className="text-text-secondary">
          Nenhum conteúdo encontrado nesta categoria.
        </p>
      )}
    </div>
  );
}
