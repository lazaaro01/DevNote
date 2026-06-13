import { ReactNode } from "react";
import type { LayoutType } from "@/lib/types";
import DefaultLayout from "./DefaultLayout";
import FullWidthLayout from "./FullWidthLayout";
import ReadingLayout from "./ReadingLayout";

export default function LayoutSwitcher({
  layout,
  tocContent,
  children,
}: {
  layout: LayoutType;
  tocContent: string;
  children: ReactNode;
}) {
  switch (layout) {
    case "full-width":
      return <FullWidthLayout tocContent={tocContent}>{children}</FullWidthLayout>;
    case "reading":
      return <ReadingLayout>{children}</ReadingLayout>;
    default:
      return <DefaultLayout tocContent={tocContent}>{children}</DefaultLayout>;
  }
}
