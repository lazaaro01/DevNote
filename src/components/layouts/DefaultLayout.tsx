import { ReactNode } from "react";
import TOC from "@/components/TOC";

export default function DefaultLayout({
  children,
  tocContent,
}: {
  children: ReactNode;
  tocContent: string;
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex gap-8 layout-container">
      <article className="min-w-0 flex-1 max-w-3xl article-content">{children}</article>
      <aside className="hidden xl:block w-56 flex-shrink-0 article-toc">
        <TOC markdown={tocContent} />
      </aside>
    </div>
  );
}
