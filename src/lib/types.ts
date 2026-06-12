export interface ContentMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  tags: string[];
  readingTime: number;
  publishedAt: string;
  featured: boolean;
}

export interface Content extends ContentMeta {
  content: string;
}

export interface CategoryInfo {
  name: string;
  slug: string;
  count: number;
}
