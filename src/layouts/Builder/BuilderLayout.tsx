import {
  SidebarInset,
  SidebarProvider,
} from "@/components/external/ui/sidebar";
import { qo } from "@/hooks/Queries/Definitions/queries";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import type {
  CourseSnap,
  ModuleSnap,
} from "@/types/Builder/BuilderSnapshotTypes.ts";
import { courseFormOpts, useAppForm } from "@/constants/form/formKit";
import { SUBMIT_COURSE_SNAPSHOT } from "@/constants/api/pathConstants";
import { ludoPost } from "@/hooks/Queries/Fetcher/ludoPost";
import { qk } from "@/hooks/Queries/Definitions/qk.ts";
import { ModuleListForm } from "@/features/Builder/Form/Module/ModuleListForm";
import { BuilderHeader } from "@/features/Builder/UI/Header/BuilderHeader";
import { ExerciseNodeForm } from "@/features/Builder/Form/Exercise/ExerciseNodeForm";
import { LudoSidebar } from "@/components/design-system/composites/sidebar/ludo-sidebar.tsx";
import { MainGridWrapper } from "@/components/design-system/layouts/grid/main-grid-wrapper.tsx";
import { getRouteApi, useRouter } from "@tanstack/react-router";

export function BuilderLayout() {
  const router = useRouter();
  const routeApi = getRouteApi("/_app/_desktopguard/build/$courseId");
  const { courseId } = routeApi.useParams();
  const { data: courseSnapshot } = useSuspenseQuery(
    qo.courseSnapshot(courseId)
  );

  const modules: ModuleSnap[] = courseSnapshot.modules;

  const qc = useQueryClient();
  const {
    moduleId: currentModuleId,
    lessonId: currentLessonId,
    exerciseId: currentExerciseId,
  } = routeApi.useSearch();

  const form = useAppForm({
    ...courseFormOpts,
    defaultValues: { courseId, modules },
    onSubmit: async ({ value }) => {
      try {
        const fresh = await ludoPost<CourseSnap>(
          SUBMIT_COURSE_SNAPSHOT,
          value,
          true
        );
        qc.setQueryData(qk.courseSnapshot(fresh.courseId), fresh);
        form.update({ defaultValues: fresh });
        form.reset();
      } catch (err) {
        console.log("Error");
        console.error("❌ Submission failed:", err);
      }
    },
  });

  async function handleFormSubmission() {
    const result = await form.validate("submit");
    console.log("Result: " + JSON.stringify(result));
    console.log("Can submit?", form.state.canSubmit);
    console.log("Full state:", form.state);
    await form.handleSubmit();
  }

  return (
    <form.AppForm>
      <SidebarProvider>
        <LudoSidebar title="Python">
          <ModuleListForm
            router={router}
            courseId={courseId}
            currentLessonId={currentLessonId}
            currentModuleId={currentModuleId}
            form={form}
          />
        </LudoSidebar>
        <SidebarInset>
          <MainGridWrapper className="max-h-dvh" gridRows="SITE">
            <BuilderHeader handleFormSubmission={handleFormSubmission} />
            <div className="grid col-span-full overflow-y-auto h-full grid-cols-12 bg-ludoGrayDark">
              <div className="col-start-2 py-8 h-full flex items-start justify-center col-end-12">
                {currentModuleId && currentLessonId && currentExerciseId && (
                  <ExerciseNodeForm
                    router={router}
                    courseId={courseId}
                    currentModuleId={currentModuleId}
                    currentLessonId={currentLessonId}
                    exerciseId={currentExerciseId}
                    form={form}
                  />
                )}
              </div>
            </div>
          </MainGridWrapper>
        </SidebarInset>
      </SidebarProvider>
    </form.AppForm>
  );
}
