import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { ContentMeta, Content, CategoryInfo } from "./types";

const contentDir = path.join(process.cwd(), "content");

const categoryNames: Record<string, string> = {
  backend: "Backend",
  frontend: "Frontend",
  database: "Banco de Dados",
  devops: "DevOps",
  architecture: "Arquitetura",
  career: "Carreira",
  cloud: "Cloud",
  mensageria: "Mensageria",
  "system-design": "System Design",
  "design-patterns": "Design Patterns",
  solid: "Princípios SOLID",
  resiliencia: "Resiliência de Sistemas",
  okrs: "OKRs",
};

export function getCategories(): CategoryInfo[] {
  const entries = fs.readdirSync(contentDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isDirectory())
    .map((e) => {
      const contents = fs.readdirSync(path.join(contentDir, e.name));
      return {
        name: categoryNames[e.name] ?? e.name,
        slug: e.name,
        count: contents.filter((f) => f.endsWith(".mdx")).length,
      };
    });
}

export function getContentList(category?: string, includeDrafts = false): ContentMeta[] {
  const categories = category
    ? [category]
    : fs.readdirSync(contentDir).filter((f) => {
        const stat = fs.statSync(path.join(contentDir, f));
        return stat.isDirectory();
      });

  const all: ContentMeta[] = [];

  for (const cat of categories) {
    const catPath = path.join(contentDir, cat);
    if (!fs.existsSync(catPath)) continue;

    const files = fs
      .readdirSync(catPath)
      .filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(catPath, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.mdx$/, "");
      const stats = readingTime(content);

      const draft = data.draft ?? false;
      if (draft && !includeDrafts) continue;

      all.push({
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        category: categoryNames[cat] ?? cat,
        categorySlug: cat,
        tags: data.tags ?? [],
        readingTime: Math.ceil(stats.minutes),
        publishedAt: data.publishedAt ?? "",
        featured: data.featured ?? false,
        layout: data.layout ?? "default",
        theme: data.theme ?? "",
        template: data.template ?? "article",
        series: data.series,
        seriesOrder: data.series_order,
        draft,
      });
    }
  }

  return all.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getContentListByTag(tag: string): ContentMeta[] {
  return getContentList().filter((item) =>
    item.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getSeriesContent(seriesName: string): ContentMeta[] {
  return getContentList()
    .filter((item) => item.series === seriesName)
    .sort((a, b) => (a.seriesOrder ?? 99) - (b.seriesOrder ?? 99));
}

export function getContent(
  category: string,
  slug: string,
  preview = false
): Content | null {
  const filePath = path.join(contentDir, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  const draft = data.draft ?? false;
  if (draft && !preview) return null;

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    category: categoryNames[category] ?? category,
    categorySlug: category,
    tags: data.tags ?? [],
    readingTime: Math.ceil(stats.minutes),
    publishedAt: data.publishedAt ?? "",
    featured: data.featured ?? false,
    layout: data.layout ?? "default",
    theme: data.theme ?? "",
    template: data.template ?? "article",
    series: data.series,
    seriesOrder: data.series_order,
    draft,
    content,
  };
}

export function getRelatedContent(
  category: string,
  currentSlug: string,
  limit = 3
): ContentMeta[] {
  return getContentList(category)
    .filter((c) => c.slug !== currentSlug)
    .slice(0, limit);
}
