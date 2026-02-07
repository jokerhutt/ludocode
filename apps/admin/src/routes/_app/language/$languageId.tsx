import { LanguagePage } from "@/features/Language/Page/LanguagePage.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/language/$languageId")({
  component: LanguagePage,
});
