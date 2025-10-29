import { ListRow } from "../../../components/Atoms/Row/ListRow";
import { ListContainer } from "../../../components/Molecules/List/ListContainer";
import {
  courseFormOpts,
  useFormContext,
  withForm,
} from "../../../form/formKit";
import { AsideComponent } from "../../../Layouts/Aside/AsideComponent";
import { ludoNavigation } from "../../../routes/ludoNavigation";
import { router } from "../../../routes/router";
import { OrderSelector } from "../UI/OrderSelector";
import { SelectionSideTab } from "../UI/SelectionSideTab";

export const ModuleForm = withForm({
  ...courseFormOpts,
  props: {
    moduleId: "" as string,
    courseId: "" as string,
  },
  render: ({ form, moduleId, courseId }) => {
    return (
      <form.Field
        name="modules"
        mode="array"
        children={(fieldArray) => (
          <AsideComponent customSpan="col-start-1 col-end-4" orientation="LEFT">
            <div className="flex flex-col py-6">
              <ListContainer title="Modules">
                {fieldArray.state.value.map((m, index) => (
                  <form.AppField
                    key={m.moduleId}
                    name={`modules[${index}]`}
                    children={(subField) => (
                      <ListRow
                        hover={false}
                        py="py-0"
                        px="px-0"
                        alignment="start"
                        active={moduleId === subField.state.value.moduleId}
                      >
                        <div className=" w-full flex gap-2 flex-col p-4">
                          <form.AppField
                            name={`modules[${index}].title`}
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
                          active={moduleId == subField.state.value.moduleId}
                          onClick={() =>
                            router.navigate(
                              ludoNavigation.build.toBuilder(
                                courseId,
                                subField.state.value.moduleId
                              )
                            )
                          }
                        />
                      </ListRow>
                    )}
                  />
                ))}
                <ListRow alignment="center" fill={true} py="py-2">
                  <p className="text-center text-xl font-bold">+</p>
                </ListRow>
              </ListContainer>
            </div>
          </AsideComponent>
        )}
      />
    );
  },
});
