import { ToSPage } from "@/features/legal/ToSPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_resources/legal/tos")({
  component: ToSPage,
});
