import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/features/Auth/AuthPage";

export const Route = createFileRoute("/auth/")({
  component: AuthPage,
});
