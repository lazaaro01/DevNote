import type { TemplateType } from "@/lib/types";
import TutorialTemplate from "./TutorialTemplate";

export default function TemplateRenderer({
  template,
}: {
  template: TemplateType;
}) {
  if (template === "tutorial") {
    return <TutorialTemplate />;
  }

  return null;
}
