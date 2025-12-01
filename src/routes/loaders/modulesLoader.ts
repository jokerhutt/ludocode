import type { QueryClient } from "@tanstack/react-query";
import type { LudoUser } from "@/types/User/LudoUser";
import { redirect } from "@tanstack/react-router";
import {
  RP_AUTH,
  RP_BUILD,
  RP_BUILD_HUB,
  RP_MODULE,
} from "../../constants/router/routes.ts";
import type { CourseProgress } from "@/types/User/CourseProgress.ts";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { ensureTreeData } from "./routerEnsures.ts";

export async function modulesRedirectLoader(
  location: { pathname: string },
  queryClient: QueryClient
) {
  console.log("M0");
  const user: LudoUser = await queryClient.ensureQueryData(qo.currentUser());

  await queryClient.ensureQueryData(qo.allCourses());

  const currentCourseId: string = await queryClient.ensureQueryData(
    qo.currentCourseId()
  );
  console.log("M1");

  if (!currentCourseId || !user) {
    throw redirect({
      to: RP_AUTH,
      replace: true,
    });
  }

  console.log("M2");
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

export async function buildSectionLoader(
  _location: { pathname: string },
  qc: QueryClient
) {
  const user = await qc.ensureQueryData(qo.currentUser());
  if (!user) throw redirect({ to: RP_AUTH, replace: true });

  qc.ensureQueryData(qo.allCourses());
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

export async function builderPageLoader(
  params: { courseId: string },
  queryClient: QueryClient
) {
  const { courseId } = params;

  if (!courseId) {
    throw redirect({ to: RP_AUTH, replace: true });
  }

  await queryClient.ensureQueryData(qo.courseSnapshot(courseId));
}
