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

type LessonCurriculumPageProps = {};

export function LessonCurriculumPage({}: LessonCurriculumPageProps) {
  const routeApi = getRouteApi("/_app/curriculum/$courseId/lesson/$lessonId");

  const { courseId, lessonId } = routeApi.useParams();

  const { data: lessonCurriculum } = useSuspenseQuery(
    qo.lessonCurriculumSnapshot(lessonId),
  );

  const [isArranging, setIsArranging] = useState(true);

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

  const handleSaveOrEdit = () => {
    if (isArranging) {
      form.handleSubmit();
    } else {
      setIsArranging(true);
    }
  };

  const cancelEditing = () => {
    form.reset();
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
            <h1 className="text-white text-3xl font-bold">Print Statements</h1>
          </div>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex gap-4 min-h-0">
              <aside className="w-1/2 flex flex-col h-full">
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
                    canSubmit={canSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </aside>

              <aside className="w-full flex min-h-0 flex-col h-full">
                {!isArranging && selectedExercise && (
                  <ExerciseDetailPreview
                    courseId={courseId}
                    exercise={selectedExercise}
                  />
                )}
              </aside>
            </div>
          )}
        />
      </form>
    </div>
  );
}
