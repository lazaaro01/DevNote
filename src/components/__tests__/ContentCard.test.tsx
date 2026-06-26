import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ContentCard from "../ContentCard";

vi.mock("next/link", () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("../TagLink", () => ({
  default: ({ tag, className }: { tag: string; className?: string }) => (
    <span className={className}>{tag}</span>
  ),
}));

vi.mock("@/lib/utils", () => ({
  formatDate: (d: string) => d,
}));

const mockContent = {
  slug: "test-article",
  title: "Test Article",
  description: "A test article description.",
  category: "Backend",
  categorySlug: "backend",
  tags: ["Java", "Spring", "API"],
  readingTime: 5,
  publishedAt: "2026-06-25",
  featured: false,
  layout: "default" as const,
  theme: "",
  template: "article" as const,
};

describe("ContentCard", () => {
  it("renders content card correctly", () => {
    const { container } = render(<ContentCard content={mockContent} />);
    expect(screen.getByText("Test Article")).toBeDefined();
    expect(screen.getByText("Backend")).toBeDefined();
    expect(screen.getByText("5 min de leitura")).toBeDefined();
    expect(screen.getByText("2026-06-25")).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  it("renders tags up to 3", () => {
    render(<ContentCard content={mockContent} />);
    expect(screen.getByText("Java")).toBeDefined();
    expect(screen.getByText("Spring")).toBeDefined();
    expect(screen.getByText("API")).toBeDefined();
  });
});
