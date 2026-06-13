import { getContentList } from "@/lib/content";

const BASE_URL = "https://devvault.app";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const allContent = getContentList().slice(0, 20);

  const items = allContent
    .map(
      (c) => `
    <item>
      <title>${escapeXml(c.title)}</title>
      <description>${escapeXml(c.description)}</description>
      <link>${BASE_URL}/${c.categorySlug}/${c.slug}</link>
      <guid>${BASE_URL}/${c.categorySlug}/${c.slug}</guid>
      <pubDate>${new Date(c.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(c.category)}</category>
    </item>`
    )
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DevVault — Biblioteca de Conhecimento Técnico</title>
    <description>Anotações, estudos e documentações organizadas sobre desenvolvimento de software, arquitetura, banco de dados e muito mais.</description>
    <link>${BASE_URL}</link>
    <language>pt-br</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
