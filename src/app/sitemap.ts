import type { MetadataRoute } from "next";
import { getContentList, getCategories } from "@/lib/content";

const BASE_URL = "https://devvault.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = getCategories();
  const allContent = getContentList();

  const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const contentUrls: MetadataRoute.Sitemap = allContent.map((c) => ({
    url: `${BASE_URL}/${c.categorySlug}/${c.slug}`,
    lastModified: new Date(c.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...categoryUrls,
    ...contentUrls,
  ];
}
