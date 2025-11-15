import { DefaultFooter } from "../../components/Molecules/Footer/DefaultFooter";
import { MainContentWrapper } from "../../Layouts/LayoutWrappers/MainContentWrapper";
import { buildRoute, router } from "../../routes/router";
import { courseFormOpts, useAppForm } from "../../form/formKit";
import { ModuleForm } from "./Forms/ModuleForm";
import { useEffect, useState } from "react";
import { LessonForm } from "./Forms/LessonForm";
import { ExerciseForm } from "./Forms/ExerciseForm";
import { ludoPost } from "@/Hooks/Queries/Fetcher/ludoPost";
import { SUBMIT_COURSE_SNAPSHOT } from "@/constants/pathConstants";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { qk } from "@/constants/qk";
import { ActionButton } from "@/components/Atoms/Button/ActionButton";
import { CourseSnapSchema } from "@/Types/Zod/SnapshotSchema/CourseSnapSchema";
import type { CourseSnap, ModuleSnap } from "@/Types/Snapshot/SnapshotTypes";
import { qo } from "@/Hooks/Queries/Definitions/queries";

type BuilderLayoutProps = {};

export function BuilderLayout({}: BuilderLayoutProps) {
  const { courseId } = buildRoute.useParams();
  const { data: courseSnapshot } = useSuspenseQuery(
    qo.courseSnapshot(courseId)
  );
  const typedSnapshot = CourseSnapSchema.parse(courseSnapshot);
  const modules: ModuleSnap[] = typedSnapshot.modules;

  const qc = useQueryClient();
  const { moduleId } = buildRoute.useParams();
  const { lessonId } = buildRoute.useSearch();

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
        <DefaultFooter phase="DEFAULT">
          <div
            className={`flex w-full justify-end py-2 items-center col-start-2 col-end-12 lg:col-start-3 lg:col-end-11`}
          >
            <ActionButton
              text="submit"
              active={true}
              onClick={async () => {
                console.log("hi");
                const result = await form.validate("submit");
                console.log(JSON.stringify(result));

                form.handleSubmit();
              }}
            />
          </div>
        </DefaultFooter>
      </div>
    </form.AppForm>
  );
}
