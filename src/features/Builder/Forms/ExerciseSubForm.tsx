import { Select, SelectItem } from "@radix-ui/react-select";
import { ListRow } from "../../../components/Atoms/Row/ListRow";
import { HollowSlot } from "../../../components/Atoms/Slot/HollowSlot";
import { ListContainer } from "../../../components/Molecules/List/ListContainer";
import { courseFormOpts, withForm } from "../../../form/formKit";
import { ExerciseOptionInputField } from "../Fields/ExerciseOptionInputField";
import TitleField from "../Fields/TitleField";
import { ExerciseTitlesForm } from "./ExerciseTitlesForm";
import { OrderSelector } from "../UI/OrderSelector";

export const ExerciseSubForm = withForm({
  ...courseFormOpts,
  props: {
    moduleIndex: 0 as number,
    lessonIndex: 0 as number,
    currentExerciseIndex: 0 as number,
  },
  render: ({ form, moduleIndex, lessonIndex, currentExerciseIndex }) => {
    return (
      <form.Field
        name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}]`}
        children={(exerciseField) => {
          const exercise = exerciseField.state.value;
          if (!exercise) return null;

          return (
            <ListContainer title={exerciseField.state.value.title ?? ""}>
              <ExerciseTitlesForm
                form={form}
                moduleIndex={moduleIndex}
                lessonIndex={lessonIndex}
                currentExerciseIndex={currentExerciseIndex}
              />
              {/* CORRECT */}
              <ListRow hover={false} fill px="px-4" py="py-2">
                <div className="flex flex-col w-full">
                  <p>Correct:</p>
                  <div
                    className={`w-full py-2 px-4 grid ${
                      exercise.exerciseType == "CLOZE"
                        ? "grid-cols-3 auto-rows-auto"
                        : "grid-cols-1"
                    } gap-2 items-start`}
                  >
                    <form.Field
                      name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].correctOptions`}
                      key={`correctOptions-${exercise.id}`}
                      mode="array"
                      children={(correctOptionsArray) => (
                        <>
                          {correctOptionsArray.state.value.map((_, index) => (
                            <form.AppField
                              name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].correctOptions[${index}].content`}
                            >
                              {() => (
                                <div className="flex items-center gap-2 border-ludoLightPurple border-2 rounded-lg">
                                  <ExerciseOptionInputField
                                    onEmpty={() =>
                                      correctOptionsArray.removeValue(index)
                                    }
                                  />
                                  <OrderSelector
                                    index={index}
                                    count={
                                      correctOptionsArray.state.value.length
                                    }
                                    prefix=""
                                    onChange={(newIndex) =>
                                      correctOptionsArray.moveValue(
                                        index,
                                        newIndex
                                      )
                                    }
                                  />
                                </div>
                              )}
                            </form.AppField>
                          ))}
                        </>
                      )}
                    />
                  </div>
                </div>
              </ListRow>

              <ListRow hover={false} fill px="px-4" py="py-2">
                <div className="flex flex-col w-full">
                  <p>Distractors:</p>
                  <div
                    className={`w-full py-2 px-4 grid ${
                      exercise.exerciseType == "CLOZE"
                        ? "grid-cols-3 auto-rows-auto"
                        : "grid-cols-1"
                    } gap-2 items-start`}
                  >
                    <form.Field
                      name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].distractors`}
                      key={`distractors-${exercise.id}`}
                      mode="array"
                      children={(distractorsArray) => (
                        <>
                          {distractorsArray.state.value.map((_, index) => (
                            <form.AppField
                              name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].distractors[${index}].content`}
                            >
                              {() => (
                                <div className="flex items-center gap-2 border-ludoLightPurple border-2 rounded-lg">
                                  <ExerciseOptionInputField
                                    onEmpty={() =>
                                      distractorsArray.removeValue(index)
                                    }
                                  />
                                </div>
                              )}
                            </form.AppField>
                          ))}
                        </>
                      )}
                    />
                  </div>
                </div>
              </ListRow>

              <ListRow hover={false} px="px-0" py="py-0">
                <div className="bg-ludoGrayLight w-full px-6 py-4 flex justify-between rounded-b-2xl">
                  <form.Field
                    name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].correctOptions`}
                    children={(optionArray) => (
                      <button
                        onClick={() => {
                          if (
                            exercise.exerciseType == "CLOZE" ||
                            optionArray.state.value.length < 1
                          ) {
                            optionArray.pushValue({
                              content: "Sample",
                              answerOrder: optionArray.state.value.length + 1,
                            });
                          }
                        }}
                        className="py-0.5 px-2 border-ludoLightPurple border-2 rounded-md"
                      >
                        Add Correct
                      </button>
                    )}
                  />

                  <form.Field
                    name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].distractors`}
                    children={(optionArray) => (
                      <button
                        onClick={() =>
                          optionArray.pushValue({
                            content: "Wrong",
                            answerOrder: null,
                          })
                        }
                        className="py-0.5 px-2 border-ludoLightPurple border-2 rounded-md"
                      >
                        Add Distractor
                      </button>
                    )}
                  />
                </div>
              </ListRow>
            </ListContainer>
          );
        }}
      />
    );
  },
});
