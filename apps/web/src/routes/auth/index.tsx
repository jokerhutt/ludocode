import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/features/Auth/Pages/AuthPage.tsx";

export const Route = createFileRoute("/auth/")({
  component: AuthPage,
});
