import { DocsPage } from "@/features/webdocs/DocsPage.tsx";
import { createFileRoute } from "@tanstack/react-router";

type DocsSearch = { slug?: string };

export const Route = createFileRoute("/_resources/docs/")({
  component: DocsPage,
  validateSearch: (search: Record<string, unknown>): DocsSearch => ({
    slug: typeof search.slug === "string" ? search.slug : undefined,
  }),
});
