import { CommonHeader } from "@/components/Molecules/Header/CommonHeader";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { qo } from "@/Hooks/Queries/Definitions/queries";
import { MainGridWrapper } from "@/Layouts/LayoutWrappers/MainGridWrapper";
import { buildRoute } from "@/routes/router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { BuilderSidebar } from "./BuilderSidebar";

import type { ModuleSnap } from "@/Types/Snapshot/SnapshotTypes";
import { useEffect, useState } from "react";
import { useBuilderForm } from "./TanstackForm/useBuilderForm";

type NewBuilderLayoutProps = {};

export function NewBuilderLayout({}: NewBuilderLayoutProps) {
  const { courseId } = buildRoute.useParams();
  const { data: courseSnapshot } = useSuspenseQuery(
    qo.courseSnapshot(courseId)
  );

  const modules: ModuleSnap[] = courseSnapshot.modules;

  const { moduleId } = buildRoute.useParams();
  const { lessonId } = buildRoute.useSearch();

  const form = useBuilderForm({courseSnapshot, modules})



  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const changeCurrentExerciseIndex = (index: number) =>
    setCurrentExerciseIndex(index);
  useEffect(() => {
    setCurrentExerciseIndex(0);
  }, [moduleId, lessonId]);

  return (
    <form.AppForm>
      <SidebarProvider>
        <BuilderSidebar courseSnapshot={courseSnapshot} />
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
