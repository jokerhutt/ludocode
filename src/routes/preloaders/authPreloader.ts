import { DEMO_LOGIN } from "@/constants/api/pathConstants";
import {
  RP_COURSE,
  RP_ONBOARDING,
  RP_ONBOARDING_START,
} from "@/constants/router/routes";
import { qo } from "@/hooks/Queries/Definitions/queries";
import type { QueryClient } from "@tanstack/react-query";
import { redirect, type ParsedLocation } from "@tanstack/react-router";
import { redirectToAuth } from "../redirects/redirects";

export async function demoAuthPreloader(queryClient: QueryClient) {
  await fetch(DEMO_LOGIN, {
    method: "GET",
    credentials: "include",
  });
  await queryClient.invalidateQueries();
  await queryClient.ensureQueryData(qo.currentUser());

  throw redirect({ to: RP_COURSE });
}

export async function appPreloader(
  location: ParsedLocation<{}>,
  queryClient: QueryClient
) {
  const user = await queryClient
    .ensureQueryData(qo.currentUser())
    .catch(() => null);
  if (!user) redirectToAuth();

  const currentCourseId = await queryClient
    .ensureQueryData(qo.currentCourseId())
    .catch(() => null);
  const userPreferences = await queryClient
    .ensureQueryData(qo.preferences())
    .catch(() => null);

  if (location.pathname.startsWith(RP_ONBOARDING)) return;

  if (!currentCourseId || !userPreferences) {
    throw redirect({ to: RP_ONBOARDING_START, replace: true });
  }
}
