import { courseFormOpts, withForm } from "@/form/formKit";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { ExerciseOptionsForm } from "./ExerciseOptionsForm";

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
    const moduleIndex = modules.findIndex(
      (m) => m.moduleId === currentModuleId
    );
    if (moduleIndex < 0) return null;

    const lessons = modules[moduleIndex].lessons;

    const lessonIndex = lessons.findIndex((l) => l.id === currentLessonId);
    if (lessonIndex < 0) return null;

    const exercises = lessons[lessonIndex].exercises;

    const exerciseIndex = exercises.findIndex((e) => e.id === exerciseId);

    return (
      <div className={`w-full rounded-md h-80 bg-ludoGrayLight p-4 space-y-4`}>
        <form.AppField
          name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises`}
          mode="array"
        >
          {(fieldArray) => {
            const exercises = fieldArray.state.value;
            return (
              <div className="w-full flex gap-2 items-center p-2 border border-ludoGrayDark rounded-md">
                {exercises.map((exercise, index) => {
                  const isSelected = exerciseIndex == index;
                  return (
                    <div
                      key={exercise.id}
                      onClick={() =>
                        router.navigate(
                          ludoNavigation.build.toBuilderExercise(
                            courseId,
                            currentModuleId,
                            currentLessonId,
                            exercise.id
                          )
                        )
                      }
                      className={`h-6 w-6 hover:cursor-pointer rounded-full ${
                        isSelected ? "bg-ludoLightPurple" : "bg-ludoGrayDark"
                      }`}
                    />
                  );
                })}
              </div>
            );
          }}
        </form.AppField>
        {!(exerciseIndex < 0) && !!exerciseId && !!exerciseIndex && (
          <ExerciseOptionsForm
            form={form}
            moduleIndex={moduleIndex}
            lessonIndex={lessonIndex}
            exerciseId={exerciseId}
            exerciseIndex={exerciseIndex}
          />
        )}
      </div>
    );
  },
});
