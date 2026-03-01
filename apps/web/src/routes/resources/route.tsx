import { ResourcesLayout } from "@/layouts/Legal/ResourcesLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resources")({
  component: ResourcesLayout,
});
