import { getRouteApi } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { qo } from "@/hooks/Queries/Definitions/queries";
import {
  CurriculumDraftLessonSchema,
  type CurriculumDraftLessonExercise,
  type CurriculumDraftLessonForm,
} from "@ludocode/types";
import { useState } from "react";
import { useAppForm } from "../types";
import { LessonCurriculumPreview } from "./Components/Preview/LessonCurriculumPreview";
import { ExerciseDetailPreview } from "./Components/Preview/ExerciseDetailPreview";
import { LessonCurriculumEditor } from "./Components/Editor/LessonCurriculumEditor";
import { ExerciseDetailEditor } from "./Components/Editor/ExerciseDetailEditor";
import { CurriculumBreadcrumbs } from "../Components/CurriculumBreadcrumbs";

type LessonCurriculumPageProps = {};

export function LessonCurriculumPage({}: LessonCurriculumPageProps) {
  const routeApi = getRouteApi("/_app/curriculum/$courseId/lesson/$lessonId");

  const { courseId, lessonId } = routeApi.useParams();

  const { data: lessonCurriculum } = useSuspenseQuery(
    qo.lessonCurriculumSnapshot(lessonId),
  );

  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const courseName =
    courses.find((c) => c.id === courseId)?.title ?? "Untitled Course";

  const { data: curriculumSnap } = useSuspenseQuery(
    qo.curriculumSnapshot(courseId),
  );
  const lessonName =
    curriculumSnap.modules
      .flatMap((m) => m.lessons)
      .find((l) => l.id === lessonId)?.title ?? "Untitled Lesson";

  const [isArranging, setIsArranging] = useState(false);

  const form = useAppForm({
    defaultValues: {
      id: lessonCurriculum.id,
      title: lessonCurriculum.title,
      exercises: lessonCurriculum.exercises,
    } satisfies CurriculumDraftLessonForm,
    validators: {
      onSubmit: CurriculumDraftLessonSchema,
    },
    onSubmit: async ({ value }) => {
      setIsArranging(false);
    },
  });

  const [selectedExercise, setSelectedExercise] =
    useState<CurriculumDraftLessonExercise | null>(null);

  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null,
  );

  const handleSaveOrEdit = () => {
    if (isArranging) {
      form.handleSubmit();
      setSelectedExercise(null);
    } else {
      setSelectedExercise(null);
      setIsArranging(true);
    }
  };

  const cancelEditing = () => {
    form.reset();
    setSelectedExercise(null);
    setIsArranging(false);
  };

  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0">
      <form
        className="min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="w-full flex justify-between border-b border-b-ludo-accent-muted pb-6">
          <div className="w-full flex gap-4 flex-col">
            <CurriculumBreadcrumbs
              courseId={courseId}
              courseName={courseName}
              lessonName={lessonName}
            />
            <h1 className="text-white text-3xl font-bold">{lessonName}</h1>
          </div>
        </div>

        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            selectedExerciseId !== null
              ? state.values.exercises.findIndex(
                  (e) => e.id === selectedExerciseId,
                )
              : -1,
          ]}
          children={([canSubmit, isSubmitting, selectedExerciseIndex]) => {
            const idx = selectedExerciseIndex as number;
            const submit = canSubmit as boolean;
            const submitting = isSubmitting as boolean;
            return (
              <div className="flex gap-4 min-h-0 w-full flex-1">
                <aside className="w-1/2 shrink-0 flex flex-col min-h-0">
                  {!isArranging ? (
                    <LessonCurriculumPreview
                      canArrange={!isArranging}
                      onArrangeClick={handleSaveOrEdit}
                      setSelectedExercise={setSelectedExercise}
                      exercises={form.state.values.exercises}
                      selectedExercise={selectedExercise}
                    />
                  ) : (
                    <LessonCurriculumEditor
                      form={form}
                      onSave={handleSaveOrEdit}
                      onCancel={cancelEditing}
                      canSubmit={submit}
                      isSubmitting={submitting}
                      selectedExerciseId={selectedExerciseId}
                      onSelectExercise={setSelectedExerciseId}
                    />
                  )}
                </aside>

                <aside className="w-1/2 flex min-h-0 flex-col">
                  {!isArranging && selectedExercise && (
                    <ExerciseDetailPreview
                      courseId={courseId}
                      exercise={selectedExercise}
                    />
                  )}
                  {isArranging && idx >= 0 && (
                    <ExerciseDetailEditor form={form} exerciseIndex={idx} />
                  )}
                </aside>
              </div>
            );
          }}
        />
      </form>
    </div>
  );
}
