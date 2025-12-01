import type { QueryClient } from "@tanstack/react-query";
import type { LudoUser } from "@/types/User/LudoUser";
import { redirect } from "@tanstack/react-router";
import { routes } from "../../constants/router/routes.ts";
import type { CourseProgress } from "@/types/User/CourseProgress.ts";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { ensureTreeData } from "../ensurers/ensureTreeData.ts";
import { redirectToAuth } from "@/routes/redirects/redirects.ts";

export async function modulesRedirectLoader(
  location: { pathname: string },
  queryClient: QueryClient
) {
  const user: LudoUser = await queryClient.ensureQueryData(qo.currentUser());

  await queryClient.ensureQueryData(qo.allCourses());

  const currentCourseId: string = await queryClient.ensureQueryData(
    qo.currentCourseId()
  );

  if (!currentCourseId || !user) redirectToAuth();

  const courseProgress: CourseProgress = await queryClient.ensureQueryData(
    qo.courseProgress(currentCourseId)
  );

  const moduleId = courseProgress.moduleId;

  console.log("CURRENT COURSE ID IS " + currentCourseId);

  const target = `/course/${currentCourseId}/module/${moduleId}`;

  if (location.pathname !== target) {
    throw redirect({
      to: routes.hub.module.moduleHub,
      params: { courseId: currentCourseId, moduleId: moduleId },
      replace: true,
    });
  }

  return { courseProgress };
}

export async function modulePageLoader(
  params: { courseId: string; moduleId: string },
  queryClient: QueryClient
) {
  const { courseId, moduleId } = params;

  if (!courseId) redirectToAuth();

  const tree = await ensureTreeData(courseId, queryClient);
  return { tree, courseId, moduleId };
}
