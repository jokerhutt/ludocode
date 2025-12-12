import { qo } from "@/hooks/Queries/Definitions/queries";
import { ludoNavigation } from "@/old-routes/navigator/ludoNavigation";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  beforeLoad: async ({ context }) => {
    console.log("App index stuff");

    const currentCourseId = await context.queryClient.ensureQueryData(
      qo.currentCourseId()
    );

    console.log("CURRCOURSEID: " + JSON.stringify(currentCourseId));

    const courseProgress = await context.queryClient.ensureQueryData(
      qo.courseProgress(currentCourseId)
    );
    console.log("CURRCOURSEPROGRESS: " + JSON.stringify(courseProgress));
    throw redirect(
      ludoNavigation.hub.module.toModule(
        courseProgress.courseId,
        courseProgress.moduleId
      )
    );
  },
});
