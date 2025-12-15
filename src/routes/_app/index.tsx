import { qo } from "@/hooks/Queries/Definitions/queries";
import { ludoNavigation } from "@/constants/ludoNavigation";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  beforeLoad: async ({ context }) => {
    const currentCourseId = await context.queryClient.ensureQueryData(
      qo.currentCourseId()
    );
    const courseProgress = await context.queryClient.ensureQueryData(
      qo.courseProgress(currentCourseId)
    );

    throw redirect(
      ludoNavigation.hub.module.toModule(
        courseProgress.courseId,
        courseProgress.moduleId
      )
    );
  },
});
