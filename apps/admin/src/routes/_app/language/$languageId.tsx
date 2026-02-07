import { ModifyLanguagePage } from "@/features/Language/Page/ModifyLanguagePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/language/$languageId")({
  component: ModifyLanguagePage,
});
