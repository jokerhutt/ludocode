import { DocsPage } from "@/features/webdocs/DocsPage.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resources/docs/")({
  component: DocsPage,
});
