import { CommonHeader } from "@/components/Molecules/Header/CommonHeader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { qo } from "@/Hooks/Queries/Definitions/queries";
import { MainGridWrapper } from "@/Layouts/LayoutWrappers/MainGridWrapper";
import { buildRoute } from "@/routes/router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { BuilderSidebar } from "./BuilderSidebar";

import type { CourseSnap, ModuleSnap } from "@/Types/Snapshot/SnapshotTypes";
import { useEffect, useState } from "react";
import { courseFormOpts, useAppForm } from "@/form/formKit";
import { SUBMIT_COURSE_SNAPSHOT } from "@/constants/pathConstants";
import { ludoPost } from "@/Hooks/Queries/Fetcher/ludoPost";
import { qk } from "@/constants/qk";

type NewBuilderLayoutProps = {};

export function NewBuilderLayout({}: NewBuilderLayoutProps) {
  const { courseId } = buildRoute.useParams();
  const { data: courseSnapshot } = useSuspenseQuery(
    qo.courseSnapshot(courseId)
  );

  const modules: ModuleSnap[] = courseSnapshot.modules;

  const qc = useQueryClient();
  const { moduleId: currentModuleId, lessonId: currentLessonId } =
    buildRoute.useSearch();

  const form = useAppForm({
    ...courseFormOpts,
    defaultValues: { courseId, modules },
    onSubmit: async ({ value }) => {
      try {
        console.log("1");
        const fresh = await ludoPost<CourseSnap>(
          SUBMIT_COURSE_SNAPSHOT,
          value,
          true
        );
        console.log("2");

        qc.setQueryData(qk.courseSnapshot(fresh.courseId), fresh);
        form.update({ defaultValues: fresh });
        form.reset();
      } catch (err) {
        console.log("Error");
        console.error("❌ Submission failed:", err);
      }
    },
  });

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const changeCurrentExerciseIndex = (index: number) =>
    setCurrentExerciseIndex(index);
  useEffect(() => {
    setCurrentExerciseIndex(0);
  }, [currentModuleId, currentLessonId]);

  return (
    <form.AppForm>
      <SidebarProvider>
        <BuilderSidebar
          currentLessonId={currentLessonId}
          currentModuleId={currentModuleId}
          form={form}
        />
        <div className="flex w-full justify-center text-white bg-ludoGrayLight items-center gap-4 px-4 h-14">
          <p>Builder</p>
        </div>
        <MainGridWrapper gridRows="SITE">
          <div className="grid col-span-full h-full grid-cols-12 bg-ludoGrayDark"></div>
        </MainGridWrapper>
      </SidebarProvider>
    </form.AppForm>
  );
}
