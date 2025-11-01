import { uuid } from "@tanstack/react-form";
import { HollowSlot } from "../../../components/Atoms/Slot/HollowSlot";
import { courseFormOpts, withForm } from "../../../form/formKit";
import { AsideComponent } from "../../../Layouts/Aside/AsideComponent";
import { ExerciseSubForm } from "./ExerciseSubForm";
import { buildRoute } from "../../../routes/router";
import { AddExerciseFieldButton } from "../Fields/AddExerciseFieldButton";
import { ExerciseIndexSlot } from "../UI/ExerciseIndexSlot";
import { ExerciseSnapSchema } from "@/Types/Zod/ExerciseSnapSchema";
import { ListRow } from "@/components/Atoms/Row/ListRow";
import { OrderSelector } from "../UI/OrderSelector";

export const ExerciseForm = withForm({
  ...courseFormOpts,
  props: {
    moduleId: "" as string,
    currentIndex: 0 as number,
    changeCurrentIndex: ((index: number) => {}) as (id: number) => void,
  },
  render: ({ form, moduleId, currentIndex, changeCurrentIndex }) => {
    const { lessonId } = buildRoute.useSearch();

    const mods = form.state.values.modules;
    const mi = mods.findIndex((m) => m.tempId === moduleId);
    if (mi < 0) return null;

    const lessons = mods[mi].lessons;
    const li = lessonId
      ? lessons.findIndex((l) => (l.id ?? l.tempId) === lessonId)
      : 0;
    if (li < 0 || !lessons[li]) return null;

    return (
      <form.AppField
        name={`modules[${mi}].lessons[${li}].exercises`}
        key={`ex-list-${mi}-${li}-${lessonId}`}
        mode="array"
        children={(fieldArray) => (
          <AsideComponent
            customSpan="col-start-8 col-end-13"
            orientation="RIGHT"
          >
            <div className="flex flex-col px-6 py-8 gap-4">
              <ExerciseSubForm
                key={`ex-${mi}-${li}-${currentIndex}`}
                form={form}
                moduleIndex={mi}
                lessonIndex={li}
                currentExerciseIndex={currentIndex}
              />
              <ListRow>
                <div className="w-full">
                    <OrderSelector
                      index={currentIndex}
                      count={fieldArray.state.value.length}
                      onChange={(newIndex) => {
                        fieldArray.moveValue(currentIndex, newIndex)
                        changeCurrentIndex(newIndex)
                      }}
                      className="border-ludoLightPurple hover:cursor-pointer border-2 rounded-md w-20"
                    />
                </div>
              </ListRow>

              <div className="w-full py-2 px-4 rounded-3xl flex bg-ludoGrayLight items-center gap-4">
                {<AddExerciseFieldButton />}
                {fieldArray.state.value.map((_, index) => (
                  <form.AppField
                    name={`modules[${mi}].lessons[${li}].exercises[${index}]`}
                    validators={{
                      onChange: ExerciseSnapSchema,
                      onSubmit: ExerciseSnapSchema,
                    }}
                    children={(subField) => {
                      const perExerciseError =
                        (subField.state.meta?.errors?.length ?? 0) > 0;
                      return (
                        <ExerciseIndexSlot
                          hasError={perExerciseError}
                          onClick={() => changeCurrentIndex(index)}
                          active={currentIndex == index}
                          index={index}
                        />
                      );
                    }}
                  />
                ))}
              </div>
            </div>
          </AsideComponent>
        )}
      />
    );
  },
});
