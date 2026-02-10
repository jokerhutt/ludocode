import { CurriculumLayout } from "@/layouts/Curriculum/CurriculumLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/curriculum")({
  component: CurriculumLayout,
});
