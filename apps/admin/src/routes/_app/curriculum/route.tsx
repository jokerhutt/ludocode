import { CurriculumLayout } from "@/layouts/Curriculum/CurriculumLayout";
import { AdminHubLayout } from "@/layouts/Hub/AdminHubLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/curriculum")({
  component: CurriculumLayout,
});
