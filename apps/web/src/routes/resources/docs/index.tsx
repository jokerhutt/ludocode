import { DocsPage } from "@/features/Docs/Pages/DocsPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resources/docs/")({
  component: DocsPage,
});
