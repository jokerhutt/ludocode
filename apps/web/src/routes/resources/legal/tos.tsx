import { ToSPage } from "@/features/legal/ToSPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resources/legal/tos")({
  component: ToSPage,
});
