import type { QueryClient } from "@tanstack/react-query";
import type { LudoUser } from "../../Types/User/LudoUser";
import { redirect, type ParsedLocation } from "@tanstack/react-router";
import { RP_AUTH, RP_BUILD, RP_MODULE } from "../../constants/routes.ts";
import type { CourseProgress } from "../../Types/Progress/CourseProgress";
import { qo } from "../../Hooks/Queries/Definitions/queries";
import type { moduleRoute } from "../router";
import { ensureTreeData } from "../routerEnsures";

export async function modulesRedirectLoader(
  location: { pathname: string },
  queryClient: QueryClient
) {
  console.log("M0")
  const user: LudoUser = await queryClient.ensureQueryData(qo.currentUser());
  const currentCourseId: string = await queryClient.ensureQueryData(
    qo.currentCourseId()
  );
   console.log("M1")

  if (!currentCourseId || !user) {
    throw redirect({
      to: RP_AUTH,
      replace: true,
    });
  }

  console.log("M2")
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

export async function buildRedirectLoader(
  _location: { pathname: string },
  qc: QueryClient
) {
  const user = await qc.ensureQueryData(qo.currentUser());
  const currentCourseId: string = await qc.ensureQueryData(
    qo.currentCourseId()
  );

  if (!currentCourseId || !user) throw redirect({ to: RP_AUTH, replace: true });

  const cp = await qc.ensureQueryData(qo.courseProgress(currentCourseId));

  throw redirect({
    to: RP_BUILD,
    params: { courseId: cp.courseId, moduleId: cp.moduleId },
    replace: true,
  });
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
  params: { courseId: string; moduleId: string },
  queryClient: QueryClient
) {
  const { courseId, moduleId } = params;

  if (!courseId) {
    throw redirect({ to: RP_AUTH, replace: true });
  }

  const courseSnapshot = await queryClient.ensureQueryData(
    qo.courseSnapshot(courseId)
  );
  console.log(JSON.stringify(courseSnapshot.modules));
  return { courseSnapshot };
}
