import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { slugify } from "@/lib/utils";
import MermaidRenderer from "./MermaidRenderer";

const components = {
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const child = React.Children.toArray(children)[0] as React.ReactElement & {
      props: { className?: string; children?: React.ReactNode };
    };
    if (
      child.props.className &&
      typeof child.props.className === "string" &&
      child.props.className.includes("language-mermaid")
    ) {
      return <MermaidRenderer chart={String(child.props.children ?? "")} />;
    }
    return <pre {...props}>{children}</pre>;
  },
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
