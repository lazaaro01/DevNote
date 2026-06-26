"use client";

import { useRouter } from "next/navigation";

export default function TagLink({ tag, className }: { tag: string; className?: string }) {
  const router = useRouter();

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        router.push(`/tag/${encodeURIComponent(tag)}`);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          router.push(`/tag/${encodeURIComponent(tag)}`);
        }
      }}
      className={`cursor-pointer transition-colors ${className ?? ""}`}
    >
      {tag}
    </span>
  );
}
