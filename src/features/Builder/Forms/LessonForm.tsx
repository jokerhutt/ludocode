import { ListRow } from "../../../components/Atoms/Row/ListRow";
import { ListContainer } from "../../../components/Molecules/List/ListContainer";
import { courseFormOpts, withForm } from "../../../form/formKit";
import { ludoNavigation } from "../../../routes/ludoNavigation";
import { buildRoute, router } from "../../../routes/router";
import { OrderSelector } from "../UI/OrderSelector";
import { SelectionSideTab } from "../UI/SelectionSideTab";
import TitleField from "../FormComponents/TitleField";
import { useEffect } from "react";

export const LessonForm = withForm({
  ...courseFormOpts,
  props: {
    courseId: "" as string,
    moduleId: "" as string,
  },
  render: ({ form, moduleId, courseId }) => {
    const { lessonId } = buildRoute.useSearch();

    const modules = form.state.values.modules;
    const mi = modules.findIndex((m) => m.moduleId === moduleId);
    if (mi < 0) return null;

    return (
      <form.Field
        key={`lessons-${moduleId}-${mi}-${form.state.values.modules[mi].lessons.length}`}
        name={`modules[${mi}].lessons`}
        mode="array"
        children={(fieldArray) => (
          <div className="col-start-4 col-end-8 overflow-auto flex flex-col gap-10 lg:gap-8 items-center px-8 py-14 min-w-0">
            <ListContainer title="Lessons">
              {fieldArray.state.value.map((l, index) => (
                <form.AppField
                  key={l.id}
                  name={`modules[${mi}].lessons[${index}]`}
                  children={(subField) => (
                    <ListRow px="0" py="0" hover={false}>
                      <div className="w-full p-4 flex gap-4 justify-between items-center">
                        <form.AppField
                          key={`tit-"${mi}-${moduleId}`}
                          name={`modules[${mi}].lessons[${index}].title`}
                          children={(field) => (
                            <field.TitleField deletable={true} />
                          )}
                        />

                        <OrderSelector
                          index={index}
                          count={fieldArray.state.value.length}
                          onChange={(newIndex) =>
                            fieldArray.moveValue(index, newIndex)
                          }
                          className="border-ludoLightPurple hover:cursor-pointer border-2 rounded-md w-20"
                        />
                      </div>
                      <SelectionSideTab
                        active={
                          (lessonId ?? "") ===
                          (subField.state.value.id ??
                            subField.state.value.tempId ??
                            "")
                        }
                        onClick={() =>
                          router.navigate(
                            ludoNavigation.build.toBuilder(
                              courseId,
                              moduleId,
                              subField.state.value.id ??
                                subField.state.value.tempId
                            )
                          )
                        }
                      />
                    </ListRow>
                  )}
                />
              ))}
            </ListContainer>
          </div>
        )}
      />
    );
  },
});
