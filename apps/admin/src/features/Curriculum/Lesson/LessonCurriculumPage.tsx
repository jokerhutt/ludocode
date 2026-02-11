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

  const [isArranging, setIsArranging] = useState(true);
  const [isEditingExercise, setIsEditingExercise] = useState(false);

  const canArrange = !isArranging && !isEditingExercise;

  const handleArrangeClick = () => {
    if (isEditingExercise) return;
    if (isArranging) return;
    setIsArranging(true);
  };

  const handleCancelClick = () => {
    if (!isArranging) return;
    setIsArranging(false);
  };

  const [selectedExercise, setSelectedExercise] =
    useState<CurriculumDraftLessonExercise | null>(null);

  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0">
      <div className="w-full flex justify-between border-b border-b-ludo-accent-muted pb-6">
        <div className="w-full flex gap-4 flex-col">
          <h1 className="text-white text-3xl font-bold">Print Statements</h1>
        </div>
      </div>
      <div className="flex gap-4 min-h-0">
        <aside className="w-1/2 flex flex-col h-full">
          {!isArranging ? (
            <LessonCurriculumPreview
              canArrange={canArrange}
              onArrangeClick={handleArrangeClick}
              setSelectedExercise={setSelectedExercise}
              exercises={lessonCurriculum["exercises"]}
              selectedExercise={selectedExercise}
            />
          ) : (
            <LessonCurriculumEditor
              onSave={handleCancelClick}
              onCancel={handleCancelClick}
              canSubmit={!canArrange}
              isSubmitting={false}
              exercises={lessonCurriculum["exercises"]}
            />
          )}
        </aside>

        <aside className="w-full flex min-h-0 flex-col h-full">
          {selectedExercise && (
            <ExerciseDetailPreview
              courseId={courseId}
              exercise={selectedExercise}
            />
          )}
        </aside>
      </div>
    </div>
  );
}
