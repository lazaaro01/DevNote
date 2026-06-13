import { compileMDX } from "next-mdx-remote/rsc";
import { slugify } from "@/lib/utils";

const components = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(typeof children === "string" ? children : "");
    return <h2 id={id} {...props}>{children}</h2>;
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(typeof children === "string" ? children : "");
    return <h3 id={id} {...props}>{children}</h3>;
  },
};

export default async function MDXContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: { parseFrontmatter: false },
    components,
  });

  return <div className="prose max-w-none">{content}</div>;
}
