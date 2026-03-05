import { LoginPage } from "@/features/auth/LoginPage.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});
