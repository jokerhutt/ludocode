import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import type { CourseProgress } from "@/types/User/CourseProgress.ts";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { ensureTreeData } from "../ensurers/ensureTreeData.ts";
import { ludoNavigation } from "../navigator/ludoNavigation.tsx";

export async function modulesRedirectLoader(queryClient: QueryClient) {
  await queryClient.ensureQueryData(qo.currentUser());
  await queryClient.ensureQueryData(qo.allCourses());

  const currentCourseId: string = await queryClient.ensureQueryData(
    qo.currentCourseId()
  );

  const courseProgress: CourseProgress = await queryClient.ensureQueryData(
    qo.courseProgress(currentCourseId)
  );

  const moduleId = courseProgress.moduleId;

  console.log("CURRENT COURSE ID IS " + currentCourseId);

  return redirect(
    ludoNavigation.hub.module.toModule(currentCourseId, moduleId)
  );
}

export async function modulePageLoader(
  params: { courseId: string; moduleId: string },
  queryClient: QueryClient
) {
  const { courseId, moduleId } = params;

  const tree = await ensureTreeData(courseId, queryClient);
  return { tree, courseId, moduleId };
}
