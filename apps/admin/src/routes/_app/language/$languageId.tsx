import { LanguagePage } from "@/features/Language/LanguagePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/language/$languageId")({
  component: LanguagePage,
});
