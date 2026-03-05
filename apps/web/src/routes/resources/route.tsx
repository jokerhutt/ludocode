import { ResourcesLayout } from "@/layouts/legal/ResourcesLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resources")({
  component: ResourcesLayout,
});
