import { ListRow } from "../../../components/Atoms/Row/ListRow";
import { ListContainer } from "../../../components/Molecules/List/ListContainer";
import { courseFormOpts, withForm } from "../../../form/formKit";
import { OrderSelector } from "../UI/OrderSelector";
import { SelectionSideTab } from "../UI/SelectionSideTab";

export const LessonForm = withForm({
  ...courseFormOpts,
  props: {
    moduleId: "" as string,
    currentLessonId: "" as string,
    changeSelectedLesson: ((lessonId: string) => {}) as (id: string) => void,
  },
  render: ({ form, moduleId, currentLessonId, changeSelectedLesson }) => {
    const modules = form.state.values.modules;
    const mi = modules.findIndex((m) => m.moduleId === moduleId);
    if (mi < 0) return null;

    return (
      <form.Field
        name={`modules[${mi}].lessons`}
        mode="array"
        children={(fieldArray) => (
          <div className="col-start-4 col-end-8 overflow-auto flex flex-col gap-10 lg:gap-8 items-center px-8 py-14 min-w-0">
            <ListContainer title="Lessons">
              {fieldArray.state.value.map((_, index) => (
                <form.Field
                  name={`modules[${mi}].lessons[${index}]`}
                  children={(subField) => (
                    <ListRow px="0" py="0" hover={false}>
                      <div className="w-full p-4 flex gap-4 items-center">
                        <form.Field
                          name={`modules[${mi}].lessons[${index}].title`}
                          children={(subFieldTitle) => (
                            <input
                              className="pl-2 rounded-lg border-2 border-ludoLightPurple py-0.5"
                              placeholder={subFieldTitle.state.value}
                              value={subFieldTitle.state.value}
                              onChange={(e) =>
                                subFieldTitle.handleChange(e.target.value)
                              }
                            />
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
                        active={currentLessonId == subField.state.value.id}
                        onClick={() =>
                          changeSelectedLesson(subField.state.value.id ?? "")
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
