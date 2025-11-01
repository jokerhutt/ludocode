import { ListRow } from "../../../components/Atoms/Row/ListRow";
import { ListContainer } from "../../../components/Molecules/List/ListContainer";
import { courseFormOpts, withForm } from "../../../form/formKit";
import { ludoNavigation } from "../../../routes/ludoNavigation";
import { buildRoute, router } from "../../../routes/router";
import { OrderSelector } from "../UI/OrderSelector";
import { SelectionSideTab } from "../UI/SelectionSideTab";
import TitleField from "../Fields/TitleField";
import { useEffect } from "react";
import { uuid } from "@tanstack/react-form";

export const LessonForm = withForm({
  ...courseFormOpts,
  props: { courseId: "" as string, moduleId: "" as string },
  render: ({ form, moduleId, courseId }) => {
    const { lessonId } = buildRoute.useSearch();

    const modules = form.state.values.modules;
    const mi = modules.findIndex((m) => m.tempId === moduleId);
    if (mi < 0) return null;

    return (
      <form.Field
        key={`lessons-${moduleId}`} // force remount when module changes
        name={`modules[${mi}].lessons`}
        mode="array"
      >
        {(fa) => (
          <div className="col-start-4 col-end-8 flex flex-col gap-10 lg:gap-8 items-center px-8 py-14 min-w-0">
            <ListContainer title="Lessons">
              {fa.state.value.map((lesson, index) => {
                const key = lesson.id ?? lesson.tempId ?? `i-${index}`;
                const thisKey = lesson.id ?? lesson.tempId ?? "";
                const isActive = (lessonId ?? "") === thisKey;

                const handleDelete = (e?: React.MouseEvent) => {
                  e?.preventDefault?.();
                  e?.stopPropagation?.();
                  const arr = fa.state.value;
                  const nextKey =
                    arr[index + 1]?.id ??
                    arr[index + 1]?.tempId ??
                    arr[index - 1]?.id ??
                    arr[index - 1]?.tempId;

                  if (isActive) {
                    router.navigate(
                      ludoNavigation.build.toBuilder(
                        courseId,
                        moduleId,
                        nextKey
                      )
                    );
                  }
                  queueMicrotask(() => fa.removeValue(index));
                };

                return (
                  <ListRow key={key} px="0" py="0" hover={false}>
                    <div className="w-full p-4 flex gap-4 justify-between items-center">
                      <form.AppField
                        name={`modules[${mi}].lessons[${index}].title`}
                      >
                        {(f) => (
                          <f.TitleField
                            arrayLength={fa.state.value.length}
                            deletable
                            onDelete={handleDelete}
                          />
                        )}
                      </form.AppField>

                      <OrderSelector
                        index={index}
                        count={fa.state.value.length}
                        onChange={(newIndex) => fa.moveValue(index, newIndex)}
                        className="border-ludoLightPurple hover:cursor-pointer border-2 rounded-md w-20"
                      />
                    </div>

                    <form.AppField
                      name={`modules[${mi}].lessons[${index}].exercises`}
                      children={(subField) => {
                        const hasError = subField.state.meta.errors?.[0]?.message
                        return (
                          <SelectionSideTab
                            active={isActive}
                            hasError={hasError}
                            onClick={() =>
                              router.navigate(
                                ludoNavigation.build.toBuilder(
                                  courseId,
                                  moduleId,
                                  thisKey || undefined
                                )
                              )
                            }
                          />
                        );
                      }}
                    />
                  </ListRow>
                );
              })}
              <ListRow
                alignment="center"
                fill
                py="py-2"
                onClick={() =>
                  fa.pushValue({
                    id: null,
                    tempId: uuid(),
                    title: "",
                    orderIndex: fa.state.value.length,
                    exercises: [],
                  })
                }
              >
                <p className="text-center text-xl font-bold">+</p>
              </ListRow>
            </ListContainer>
          </div>
        )}
      </form.Field>
    );
  },
});
