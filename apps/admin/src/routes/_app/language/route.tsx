import { LanguageLayout } from "@/layouts/Language/LanguageLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/language")({
  component: LanguageLayout,
});
