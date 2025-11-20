import { courseFormOpts, withForm } from "@/form/formKit";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { Button } from "@/components/ui/button";
import { BuilderNode } from "@/components/Atoms/Tree/BuilderNode";
import { EditNodeDialog } from "@/components/Molecules/Dialog/EditNodeDialog";
import { ExpandCollapsibleButtonProps } from "@/components/Atoms/Button/ExpandCollapsibleButton";
import { LessonListForm } from "../Lesson/LessonListForm";
import { StatusButtonField } from "@/components/Atoms/Status/StatusButtonField";
import { SelectModuleButton } from "../../UI/Button/SelectModuleButton";
import { BuilderNodeWrapper } from "@/components/Molecules/Sidebar/BuilderNodeWrapper";

export const ModuleNodeForm = withForm({
  ...courseFormOpts,
  props: {
    removeModule: null as ((thisId: string, index: number) => void) | null,
    updateOrder: null as ((oldIndex: number, newIndex: number) => void) | null,
    courseId: "" as string,
    moduleId: "" as string,
    modulesLength: 0 as number,
    currentModuleId: "" as string,
    currentLessonId: "" as string,
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
              ludoNavigation.build.toBuilderLesson(
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
                      return <StatusButtonField hasError={!!hasError} />;
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
                  <Button className="h-6">Edit</Button>
                </EditNodeDialog>
                <ExpandCollapsibleButtonProps
                  isExpanded={isExpanded}
                  onClick={() =>
                    field.handleChange({ ...module, isExpanded: !isExpanded })
                  }
                />
              </BuilderNodeWrapper>

              <LessonListForm
                form={form}
                currentLessonId={currentLessonId}
                courseId={courseId}
                moduleId={moduleId}
                isExpanded={isExpanded}
                moduleIndex={index}
              />
            </div>
          );
        }}
      </form.Field>
    );
  },
});
