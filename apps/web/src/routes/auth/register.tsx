import { RegistrationPage } from "@/features/auth/RegistrationPage.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RegistrationPage,
});
