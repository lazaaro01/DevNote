import { ReactNode } from "react";

export default function ReadingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 layout-container">
      <article className="min-w-0 flex-1 article-content">{children}</article>
    </div>
  );
}
