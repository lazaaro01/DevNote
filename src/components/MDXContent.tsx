import { compileMDX } from "next-mdx-remote/rsc";

const components = {};

export default async function MDXContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: false },
    components,
  });

  return <div className="prose max-w-none">{content}</div>;
}
