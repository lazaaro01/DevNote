import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Breadcrumbs from "../Breadcrumbs";

vi.mock("next/link", () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("Breadcrumbs", () => {
  it("renders home and items", () => {
    const { container } = render(
      <Breadcrumbs
        items={[
          { label: "Backend", href: "/backend" },
          { label: "Test Article" },
        ]}
      />
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Backend")).toBeDefined();
    expect(screen.getByText("Test Article")).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
