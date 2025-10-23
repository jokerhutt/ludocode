import type { QueryClient } from "@tanstack/react-query";
import type { LudoUser } from "../../Types/User/LudoUser";
import { redirect, type ParsedLocation } from "@tanstack/react-router";
import { RP_AUTH, RP_MODULE } from "../../constants/routePaths";
import type { CourseProgress } from "../../Types/Progress/CourseProgress";
import { qo } from "../../Hooks/Queries/Definitions/queries";
import type { moduleRoute } from "../router";
import { ensureTreeData } from "../routerEnsures";

export async function modulesRedirectLoader(
  location: { pathname: string },
  queryClient: QueryClient
) {
  const user: LudoUser = await queryClient.ensureQueryData(qo.currentUser());

  if (!user.currentCourse) {
    throw redirect({
      to: RP_AUTH,
      replace: true,
    });
  }

  const courseProgress: CourseProgress = await queryClient.ensureQueryData(
    qo.courseProgress(user.currentCourse)
  );

  const currentCourseId = courseProgress.courseId;
  const moduleId = courseProgress.moduleId;

  console.log("CURRENT COURSE ID IS " + currentCourseId);

  const target = `/course/${currentCourseId}/module/${moduleId}`;

  if (location.pathname !== target) {
    throw redirect({
      to: RP_MODULE,
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

  if (!courseId) {
    throw redirect({ to: RP_AUTH, replace: true });
  }

  const tree = await ensureTreeData(courseId, queryClient);
  return { tree, courseId, moduleId };
}
