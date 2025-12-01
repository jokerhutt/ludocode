import { routes } from "@/constants/router/routes";
import { redirect } from "@tanstack/react-router";

export function redirectToAuth() {
  throw redirect({
    to: routes.auth.authPage,
    replace: true,
  });
}
