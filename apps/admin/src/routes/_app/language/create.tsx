import { CreateLanguagePage } from "@/features/language/CreateLanguagePage.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/language/create")({
  component: CreateLanguagePage,
});