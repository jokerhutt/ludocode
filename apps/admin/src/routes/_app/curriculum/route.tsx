import { createFileRoute } from "@tanstack/react-router";
import { CurriculumLayout } from "./-components/CurriculumLayout";


export const Route = createFileRoute("/_app/curriculum")({
  component: CurriculumLayout,
});
