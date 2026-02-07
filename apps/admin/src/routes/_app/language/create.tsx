import { CreateLanguagePage } from "@/features/Language/Page/CreateLanguagePage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/language/create")({
  component: CreateLanguagePage,
});