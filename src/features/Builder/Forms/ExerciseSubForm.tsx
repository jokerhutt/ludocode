import { ListRow } from "../../../components/Atoms/Row/ListRow";
import { HollowSlot } from "../../../components/Atoms/Slot/HollowSlot";
import { ListContainer } from "../../../components/Molecules/List/ListContainer";
import { courseFormOpts, withForm } from "../../../form/formKit";

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
          const initialDistractors = exercise.options.filter(
            (option) => option.answerOrder == null
          );
          const initialCorrect = exercise.options.filter(
            (option) => option.answerOrder != null
          );

          return (
            <ListContainer title={fieldArray.state.value.title}>
              <ListRow alignment="center">
                <p>{exercise.exerciseType}</p>
              </ListRow>
              <ListRow px="px-4">
                <div className="w-full flex flex-col items-start">
                  <p>T: {exercise.title}</p>
                </div>
              </ListRow>
              <ListRow px="px-4">
                <div className="w-full flex flex-col items-start">
                  <p>P: {exercise.prompt}</p>
                </div>
              </ListRow>
              <ListRow fill px="px-4" py="py-2">
                <p>Correct: </p>
                <div className="w-full py-2 px-4 items-center flex gap-2">
                  {initialCorrect.map((option) => (
                    <HollowSlot padding="px-6 py-1" key={option.content}>
                      <span>{option.content}</span>
                    </HollowSlot>
                  ))}
                </div>
              </ListRow>

              <ListRow fill px="px-4" py="py-2">
                <p>Distractors: </p>
                <div className="w-full py-2 px-4 items-center flex gap-2">
                  {initialDistractors.map((option) => (
                    <HollowSlot padding="px-6 py-1" key={option.content}>
                      <span>{option.content}</span>
                    </HollowSlot>
                  ))}
                </div>
              </ListRow>
            </ListContainer>
          );
        }}
      />
    );
  },
});
