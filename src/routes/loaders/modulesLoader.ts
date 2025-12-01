import type { QueryClient } from "@tanstack/react-query";
import type { LudoUser } from "@/types/User/LudoUser";
import { redirect } from "@tanstack/react-router";
import { RP_AUTH, RP_MODULE } from "../../constants/router/routes.ts";
import type { CourseProgress } from "@/types/User/CourseProgress.ts";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { ensureTreeData } from "../ensurers/ensureTreeData.ts";

export async function modulesRedirectLoader(
  location: { pathname: string },
  queryClient: QueryClient
) {
  const user: LudoUser = await queryClient.ensureQueryData(qo.currentUser());

  await queryClient.ensureQueryData(qo.allCourses());

  const currentCourseId: string = await queryClient.ensureQueryData(
    qo.currentCourseId()
  );

  if (!currentCourseId || !user) {
    throw redirect({
      to: RP_AUTH,
      replace: true,
    });
  }

  const courseProgress: CourseProgress = await queryClient.ensureQueryData(
    qo.courseProgress(currentCourseId)
  );

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

