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
                {fieldArray.state.value.map((_, index) => (
                  <form.Field
                    name={`modules[${index}]`}
                    children={(subField) => (
                      <ListRow
                        alignment="between"
                        onClick={() =>
                          router.navigate(
                            ludoNavigation.build.toBuilder(
                              courseId,
                              subField.state.value.moduleId
                            )
                          )
                        }
                        key={subField.state.value.moduleId}
                        active={moduleId === subField.state.value.moduleId}
                        px="px-2"
                      >
                        <div className=" w-full flex gap-2 flex-col">
                          <p>{subField.state.value.title}</p>
                          <select
                            className="border-ludoLightPurple border-2 rounded-md w-20"
                            value={`${index}`}
                            onChange={(e) =>
                              fieldArray.moveValue(index, Number(e.target.value))
                            }
                          >
                            {fieldArray.state.value.map((_, index) => (
                              <option key={index} value={`${index}`}>
                                # {index}
                              </option>
                            ))}
                          </select>
                        </div>
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
