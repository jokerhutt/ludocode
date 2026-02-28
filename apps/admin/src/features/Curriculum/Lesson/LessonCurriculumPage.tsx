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
import { ExerciseDetailEditor } from "./Components/Editor/ExerciseEditor/ExerciseDetailEditor";
import { CurriculumBreadcrumbs } from "../Components/CurriculumBreadcrumbs";
import { useUpdateLesson } from "@/hooks/Queries/Mutations/useUpdateLesson";
import { Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ludocode/external/ui/dialog";

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

  const [isEditing, setIsEditing] = useState(false);

  const submitMutation = useUpdateLesson({ lessonId });

  const form = useAppForm({
    defaultValues: {
      exercises: lessonCurriculum.exercises,
    } satisfies CurriculumDraftLessonForm,
    validators: {
      onSubmit: CurriculumDraftLessonSchema,
    },
    onSubmit: async ({ value }) => {
      submitMutation.mutate(value, {
        onSuccess: async (payload) => {
          await submitMutation.mutateAsync(value);
          form.reset(value);
          setIsEditing(false);
        },
      });
    },
  });

  const [selectedExercise, setSelectedExercise] =
    useState<CurriculumDraftLessonExercise | null>(null);

  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(
    null,
  );

  const handleSaveOrEdit = () => {
    if (isEditing) {
      form.handleSubmit();
      setSelectedExercise(null);
    } else {
      setSelectedExercise(null);
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    form.reset();
    setSelectedExercise(null);
    setIsEditing(false);
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
                  (e) => e.exerciseId === selectedExerciseId,
                )
              : -1,
          ]}
          children={([canSubmit, isSubmitting, selectedExerciseIndex]) => {
            const idx = selectedExerciseIndex as number;
            const submit = canSubmit as boolean;
            const submitting = isSubmitting as boolean;
            return (
              <>
                <form.Subscribe
                  selector={(state) => state.errorMap.onSubmit}
                  children={(onSubmitError) => (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className={`relative p-1.5 rounded transition-colors ${
                            onSubmitError
                              ? "text-red-400 bg-red-400/10 hover:cursor-pointer"
                              : "text-ludoAltText/30 cursor-default"
                          }`}
                        >
                          <Bell size={18} />
                          {onSubmitError && (
                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-ludo-background" />
                          )}
                        </button>
                      </DialogTrigger>
                      {onSubmitError && (
                        <DialogContent className="bg-ludo-surface border-ludo-border">
                          <DialogHeader>
                            <DialogTitle className="text-red-400">
                              Validation errors
                            </DialogTitle>
                          </DialogHeader>
                          <pre className="whitespace-pre-wrap text-xs text-red-300 max-h-80 overflow-y-auto">
                            {typeof onSubmitError === "string"
                              ? onSubmitError
                              : JSON.stringify(onSubmitError, null, 2)}
                          </pre>
                        </DialogContent>
                      )}
                    </Dialog>
                  )}
                />
                <div className="flex gap-4 min-h-0 w-full flex-1">
                  <aside className="w-1/2 shrink-0 flex flex-col min-h-0">
                    {!isEditing ? (
                      <LessonCurriculumPreview
                        canEdit={!isEditing}
                        onEditClick={handleSaveOrEdit}
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
                    {!isEditing && selectedExercise && (
                      <ExerciseDetailPreview exercise={selectedExercise} />
                    )}
                    {isEditing && idx >= 0 && (
                      <ExerciseDetailEditor
                        form={form}
                        exerciseIndex={idx}
                        onDelete={() => {
                          form.removeFieldValue("exercises", idx);
                          setSelectedExerciseId(null);
                        }}
                        canDelete={form.state.values.exercises.length > 1}
                      />
                    )}
                  </aside>
                </div>
              </>
            );
          }}
        />
      </form>
    </div>
  );
}
