import Link from "next/link";
import type { CategoryInfo } from "@/lib/types";

const icons: Record<string, string> = {
  backend: "⚙️",
  frontend: "🎨",
  database: "🗄️",
  devops: "🐳",
  architecture: "🏗️",
  career: "🚀",
  algorithms: "🧮",
};

export default function CategoryCard({ category }: { category: CategoryInfo }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group flex items-center gap-4 p-4 bg-card border border-slate-200 rounded-xl hover:border-accent hover:shadow-sm transition-all"
    >
      <span className="text-2xl">{icons[category.slug] ?? "📁"}</span>
      <div>
        <h3 className="font-semibold text-text group-hover:text-accent transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-text-secondary">
          {category.count} {category.count === 1 ? "conteúdo" : "conteúdos"}
        </p>
      </div>
    </Link>
  );
}
