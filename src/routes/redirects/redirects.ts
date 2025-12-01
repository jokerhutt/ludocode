import { RP_AUTH } from "../../constants/router/routes.ts";
import { redirect } from "@tanstack/react-router";
export function redirectToAuthCourse() {
  throw redirect({
    to: RP_AUTH,
    replace: true,
  });
}
