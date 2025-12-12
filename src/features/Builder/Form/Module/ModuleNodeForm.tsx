import { courseFormOpts, withForm } from "@/constants/form/formKit";
import { ludoNavigation } from "@/old-routes/navigator/ludoNavigation.tsx";
import { Button } from "@/components/external/ui/button";
import { LessonListForm } from "../Lesson/LessonListForm";
import { BuilderNodeWrapper } from "@/components/design-system/blocks/wrapper/builder-node-wrapper.tsx";
import { BuilderNode } from "@/components/design-system/atoms/tree/builder-node.tsx";
import { StatusButtonField } from "@/components/design-system/atoms/status/status-button-field.tsx";
import { EditNodeDialog } from "@/features/Builder/UI/Dialog/EditNodeDialog.tsx";
import { CollapsibleButton } from "@/components/design-system/atoms/button/collapsible-button.tsx";
import { router } from "@/main";

export const ModuleNodeForm = withForm({
  ...courseFormOpts,
  props: {
    removeModule: null as ((thisId: string, index: number) => void) | null,
    updateOrder: null as ((oldIndex: number, newIndex: number) => void) | null,
    courseId: "" as string,
    moduleId: "" as string,
    modulesLength: 0 as number,
    currentModuleId: "" as string,
    currentLessonId: "" as string | undefined,
    index: 0 as number,
  },
  render: ({
    form,
    updateOrder,
    removeModule,
    courseId,
    moduleId,
    modulesLength,
    index,
    currentModuleId,
    currentLessonId,
  }) => {
    return (
      <form.Field name={`modules[${index}]`}>
        {(field) => {
          const modules = form.state.values.modules;
          const module = field.state.value;
          const isExpanded = !!module.isExpanded;
          const isSelected =
            currentModuleId != null && currentModuleId == moduleId;

          const selectModule = () => {
            const newModuleIndex = modules.findIndex(
              (module) => module.moduleId == moduleId
            );
            if (newModuleIndex < 0) return;
            const firstLessonOfNewModule = modules[newModuleIndex].lessons[0];
            if (!firstLessonOfNewModule) return;
            router.navigate(
              ludoNavigation.builder.toBuilderLesson(
                courseId,
                moduleId,
                firstLessonOfNewModule.id
              )
            );
          };

          return (
            <div className="flex flex-col">
              <BuilderNodeWrapper>
                <BuilderNode
                  onSelect={() => selectModule()}
                  isSelected={isSelected}
                  title={module.title}
                  status
                >
                  <form.AppField name={`modules[${index}]`}>
                    {(moduleField) => {
                      const hasError =
                        moduleField.state.meta.errors?.[0]?.message;
                      return (
                        <form.AppField name={`modules[${index}].lessons`}>
                          {(lessonsField) => {
                            const lessonsHaveError =
                              lessonsField.state.meta.errors?.[0]?.message;
                            return (
                              <StatusButtonField
                                hasError={!!hasError || !!lessonsHaveError}
                              />
                            );
                          }}
                        </form.AppField>
                      );
                    }}
                  </form.AppField>
                </BuilderNode>
                <EditNodeDialog
                  removeItem={() => removeModule?.(moduleId, index)}
                  updateOrder={updateOrder}
                  arrayLength={modulesLength}
                  moduleIndex={index}
                  lessonIndex={0}
                  type="module"
                  form={form}
                >
                  <Button className="h-6" asChild>
                    <span>Edit</span>
                  </Button>
                </EditNodeDialog>
                <CollapsibleButton
                  isExpanded={isExpanded}
                  onClick={() =>
                    field.handleChange({ ...module, isExpanded: !isExpanded })
                  }
                />
              </BuilderNodeWrapper>

              {currentLessonId && (
                <LessonListForm
                  form={form}
                  currentLessonId={currentLessonId}
                  courseId={courseId}
                  moduleId={moduleId}
                  isExpanded={isExpanded}
                  moduleIndex={index}
                />
              )}
            </div>
          );
        }}
      </form.Field>
    );
  },
});
