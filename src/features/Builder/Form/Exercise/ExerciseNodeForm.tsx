import { courseFormOpts, withForm } from "@/constants/form/formKit";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/navigator/ludoNavigation.tsx";
import type { ExerciseSnap } from "@/types/Builder/BuilderSnapshotTypes.ts";
import { parseExerciseError } from "@/features/Builder/Util/ParseErrors";
import { ExerciseNodeInfoForm } from "./ExerciseNodeInfoForm";
import { ExerciseNodesList } from "@/features/Builder/Form/Exercise/ExerciseNodesList";
import { ExerciseOptionsForm } from "./ExerciseOptionsForm";
import { SingleExerciseNodeWrapper } from "../../UI/Wrapper/SingleExerciseNodeWrapper";
import { ExerciseControllerHeader } from "../../UI/Wrapper/ExerciseControllerHeader";
import { ModifyExerciseRow } from "../../UI/Button/ModifyExerciseRow";

export const ExerciseNodeForm = withForm({
  ...courseFormOpts,
  props: {
    courseId: "" as string,
    currentModuleId: "" as string,
    currentLessonId: "" as string,
    exerciseId: "" as string,
  },
  render: ({
    form,
    courseId,
    currentModuleId,
    currentLessonId,
    exerciseId,
  }) => {
    const modules = form.state.values.modules;
    if (!modules) return null;
    const moduleIndex = modules.findIndex(
      (m) => m.moduleId === currentModuleId
    );
    if (moduleIndex < 0) return null;

    const lessons = modules[moduleIndex].lessons;
    if (!lessons) return null;
    const lessonIndex = lessons.findIndex((l) => l.id === currentLessonId);
    if (lessonIndex < 0) return null;

    const currentLesson = lessons[lessonIndex];
    const currentModule = modules[moduleIndex];

    if (currentLesson == null || currentModule == null) return null;

    return (
      <div className="w-full rounded-md flex flex-col space-y-4">
        <form.AppField
          key={`${currentModuleId}-${currentLessonId}-${exerciseId}`}
          name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises`}
          mode="array"
        >
          {(fieldArray) => {
            const exercises = fieldArray.state.value;

            if (!exercises) return null;
            const canRemoveExercises = exercises.length > 1;

            const exerciseIndex = exercises.findIndex(
              (e) => e.id === exerciseId
            );

            const errorEntries = fieldArray.state.meta.errors ?? [];

            const errorMap = parseExerciseError(errorEntries, exercises);

            const hasValidIndex =
              exerciseIndex >= 0 && exerciseIndex < exercises.length;

            const exerciseType = hasValidIndex
              ? exercises[exerciseIndex].exerciseType
              : null;

            const createExercise = (newExercise: ExerciseSnap) => {
              fieldArray.pushValue(newExercise);
            };

            const removeExercise = () => {
              if (!canRemoveExercises) return;
              if (!hasValidIndex) return;

              const nextId =
                exercises[exerciseIndex + 1]?.id ??
                exercises[exerciseIndex - 1]?.id;

              fieldArray.removeValue(exerciseIndex);

              if (nextId) {
                router.navigate(
                  ludoNavigation.builder.toBuilderExercise(
                    courseId,
                    currentModuleId,
                    currentLessonId,
                    nextId
                  )
                );
              } else {
                router.navigate(ludoNavigation.hub.builder.toBuilderHub());
              }
            };

            const handleSelect = (id: string) => {
              router.navigate(
                ludoNavigation.builder.toBuilderExercise(
                  courseId,
                  currentModuleId,
                  currentLessonId,
                  id
                )
              );
            };

            const handleReorder = (oldIndex: number, newIndex: number) => {
              if (oldIndex === newIndex) return;
              fieldArray.moveValue(oldIndex, newIndex);
            };

            return (
              <>
                <div className="w-full flex rounded-md bg-ludoGrayLight p-4 flex-col gap-2">
                  <ExerciseControllerHeader
                    currentLessonIndex={lessonIndex}
                    currentModuleIndex={moduleIndex}
                    currentModule={currentModule}
                    currentLesson={currentLesson}
                    exerciseType={exerciseType}
                  />
                  <ExerciseNodesList
                    exercises={exercises}
                    currentExerciseId={exerciseId}
                    onSelect={handleSelect}
                    errorMap={errorMap}
                    onReorder={handleReorder}
                  />

                  <ModifyExerciseRow
                    createExercise={createExercise}
                    canRemoveExercises={canRemoveExercises}
                    removeExercise={removeExercise}
                  />
                </div>

                {hasValidIndex && exerciseId && (
                  <SingleExerciseNodeWrapper>
                    <ExerciseNodeInfoForm
                      key={exerciseId}
                      form={form}
                      moduleIndex={moduleIndex}
                      lessonIndex={lessonIndex}
                      exerciseIndex={exerciseIndex}
                    />
                    {!!exerciseType && exerciseType !== "INFO" && (
                      <ExerciseOptionsForm
                        form={form}
                        moduleIndex={moduleIndex}
                        lessonIndex={lessonIndex}
                        exerciseId={exerciseId}
                        exerciseIndex={exerciseIndex}
                      />
                    )}
                  </SingleExerciseNodeWrapper>
                )}
              </>
            );
          }}
        </form.AppField>
      </div>
    );
  },
});
