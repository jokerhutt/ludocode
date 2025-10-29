import { ListRow } from "../../../components/Atoms/Row/ListRow";
import { HollowSlot } from "../../../components/Atoms/Slot/HollowSlot";
import { ListContainer } from "../../../components/Molecules/List/ListContainer";
import { courseFormOpts, withForm } from "../../../form/formKit";
import { ExerciseOptionInputField } from "../Fields/ExerciseOptionInputField";

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
        children={(fieldArray) => {
          const exercise = fieldArray.state.value;

          return (
            <ListContainer title={fieldArray.state.value.title}>
              <ListRow hover={false} alignment="center">
                <p>{exercise.exerciseType}</p>
              </ListRow>
              <ListRow hover={false} px="px-4">
                <div className="w-full flex flex-col items-start">
                  <p>T: {exercise.title}</p>
                </div>
              </ListRow>
              <ListRow hover={false} px="px-4">
                <div className="w-full flex flex-col items-start">
                  <p>P: {exercise.prompt}</p>
                </div>
              </ListRow>
              <form.Field
                name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].options`}
                mode="array"
                children={(optionArray) => {
                  const initialDistractors = optionArray.state.value.filter(
                    (option) => option.answerOrder == null
                  );
                  const initialCorrect = optionArray.state.value.filter(
                    (option) => option.answerOrder != null
                  );

                  return (
                    <>
                      <ListRow hover={false} fill px="px-4" py="py-2">
                        <div className="flex flex-col w-full">
                          <p>Correct: </p>

                          <div
                            className={`w-full py-2 px-4 grid ${
                              exercise.exerciseType == "CLOZE"
                                ? "grid-cols-3 auto-rows-auto"
                                : "grid-cols-1 "
                            }  gap-2 items-start`}
                          >
                            {initialCorrect.map((option, index) => (
                              <form.AppField
                                name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].options[${index}].content`}
                                key={option.content}
                                children={(optionContent) => (
                                  <ExerciseOptionInputField />
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </ListRow>

                      <ListRow hover={false} fill px="px-4" py="py-2">
                        <div className="flex flex-col w-full">
                          <p>Distractors: </p>
                          <div
                            className={`w-full py-2 px-4 grid ${
                              exercise.exerciseType == "CLOZE"
                                ? "grid-cols-3 auto-rows-auto"
                                : "grid-cols-1 "
                            }  gap-2 items-start`}
                          >
                            {initialDistractors.map((option, index) => (
                              <form.AppField
                                key={option.content}
                                name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].options[${index}].content`}
                                children={(optionContent) => (
                                  <ExerciseOptionInputField />
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </ListRow>
                      <ListRow hover={false} px="px-0" py="py-0">
                        <div className="bg-ludoGrayLight w-full px-6 py-4 flex justify-between rounded-b-2xl">
                          <button
                            onClick={() =>
                              optionArray.pushValue({
                                content: "Sample",
                                answerOrder: optionArray.state.value.length + 1,
                              })
                            }
                            className="py-0.5 px-2 border-ludoLightPurple border-2 rounded-md"
                          >
                            Add Correct
                          </button>
                          <button
                            onClick={() =>
                              optionArray.pushValue({
                                content: "Wrong",
                                answerOrder: null,
                              })
                            }
                            className="py-0.5 px-2 border-ludoLightPurple border-2 rounded-md"
                          >
                            Add Incorrect
                          </button>
                        </div>
                      </ListRow>
                    </>
                  );
                }}
              />
            </ListContainer>
          );
        }}
      />
    );
  },
});
