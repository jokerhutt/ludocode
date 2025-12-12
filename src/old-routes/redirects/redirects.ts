import { redirect } from "@tanstack/react-router";

export function redirectToAuth() {
  throw redirect({
    to: "/auth",
    replace: true,
  });
}
