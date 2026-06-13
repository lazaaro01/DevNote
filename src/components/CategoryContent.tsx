"use client";

import { useSearchParams } from "next/navigation";
import ContentCard from "./ContentCard";
import ViewToggle from "./ViewToggle";
import type { ContentMeta } from "@/lib/types";

export default function CategoryContent({
  contents,
}: {
  contents: ContentMeta[];
}) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") === "list" ? "list" : "grid";

  return (
    <div>
      <div className="flex items-center justify-end mb-6">
        <ViewToggle />
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contents.map((content) => (
            <ContentCard key={content.slug} content={content} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {contents.map((content) => (
            <ContentCard key={content.slug} content={content} />
          ))}
        </div>
      )}
    </div>
  );
}
