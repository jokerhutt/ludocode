import { ListRow } from "@/components/Atoms/Row/ListRow";
import { courseFormOpts, withForm } from "@/form/formKit";

export const ExerciseTitlesForm = withForm({
  ...courseFormOpts,
  props: {
    moduleIndex: 0 as number,
    lessonIndex: 0 as number,
    currentExerciseIndex: 0 as number,
  },
  render: ({ form, moduleIndex, lessonIndex, currentExerciseIndex }) => {
    return (
      <>
        <ListRow hover={false} px="px-4">
          <p className="mr-4">Type: </p>
          <form.AppField
            name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].exerciseType`}
            children={(field) => <field.TitleField arrayLength={0} />}
          />
        </ListRow>

        <ListRow hover={false} px="px-4">
          <p className="mr-4">Title: </p>
          <form.AppField
            name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].title`}
            children={(field) => <field.TitleField arrayLength={0} />}
          />
        </ListRow>

        <ListRow hover={false} px="px-4">
          <p className="mr-4">Subtitle: </p>
          <form.AppField
            name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].subtitle`}
            children={(field) => <field.TitleField arrayLength={0} />}
          />
        </ListRow>

        <ListRow hover={false} px="px-4">
          <p className="mr-4">Prompt: </p>
          <form.AppField
            name={`modules[${moduleIndex}].lessons[${lessonIndex}].exercises[${currentExerciseIndex}].prompt`}
            children={(field) => <field.TitleField arrayLength={0} />}
          />
        </ListRow>
      </>
    );
  },
});
