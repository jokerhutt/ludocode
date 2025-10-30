import { LessonFooter } from "../../components/Molecules/Footer/LessonFooter";
import { MainContentWrapper } from "../../Layouts/LayoutWrappers/MainContentWrapper";
import { buildRoute, router } from "../../routes/router";
import type {
  CourseSnap,
  LessonSnap,
  ModuleSnapshot,
} from "../../Types/Snapshot/SnapshotTypes";
import { courseFormOpts, useAppForm } from "../../form/formKit";
import { ModuleForm } from "./Forms/ModuleForm";
import { useEffect, useState } from "react";
import { LessonForm } from "./Forms/LessonForm";
import { ExerciseForm } from "./Forms/ExerciseForm";
import { ludoPost } from "@/Hooks/Queries/Fetcher/ludoPost";
import { SUBMIT_COURSE_SNAPSHOT } from "@/constants/pathConstants";
import { useQueryClient } from "@tanstack/react-query";
import { qk } from "@/constants/qk";
import { ActionButton } from "@/components/Atoms/Button/ActionButton";

type BuilderLayoutProps = {};

export function BuilderLayout({}: BuilderLayoutProps) {
  const { courseSnapshot } = buildRoute.useLoaderData();
  const typedSnapshot: CourseSnap = courseSnapshot;

  const qc = useQueryClient();

  const courseId = typedSnapshot.courseId;
  const modules = typedSnapshot.modules;

  const { moduleId } = buildRoute.useParams();

  const form = useAppForm({
    ...courseFormOpts,
    defaultValues: { courseId, modules },
    onSubmit: async ({ value }) => {
      const fresh = await ludoPost<CourseSnap>(
        SUBMIT_COURSE_SNAPSHOT,
        value,
        true
      );

      qc.setQueryData(qk.courseSnapshot(fresh.courseId), fresh);
      form.reset();
    },
  });

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const changeCurrentExerciseIndex = (index: number) =>
    setCurrentExerciseIndex(index);
  const { lessonId } = buildRoute.useSearch();
  useEffect(() => {
    setCurrentExerciseIndex(0);
  }, [moduleId, lessonId]);

  return (
    <form.AppForm>
      <div className="grid grid-rows-[1fr_auto] min-h-0">
        <MainContentWrapper>
          <div className="grid grid-cols-12 bg-ludoGrayDark">
            <ModuleForm form={form} moduleId={moduleId} courseId={courseId} />
            <LessonForm form={form} moduleId={moduleId} courseId={courseId} />
            <ExerciseForm
              changeCurrentIndex={changeCurrentExerciseIndex}
              form={form}
              moduleId={moduleId}
              currentIndex={currentExerciseIndex}
            />
          </div>
        </MainContentWrapper>
        <LessonFooter phase="DEFAULT">
          <div
            className={`flex w-full justify-end py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}
          >
            <ActionButton text="submit" active={true} onClick={() => form.handleSubmit()}/>
          </div>
        </LessonFooter>
      </div>
    </form.AppForm>
  );
}
