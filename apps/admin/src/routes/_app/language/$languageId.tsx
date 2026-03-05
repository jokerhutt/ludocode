import { ModifyLanguagePage } from "@/features/language/ModifyLanguagePage.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/language/$languageId")({
  component: ModifyLanguagePage,
});


