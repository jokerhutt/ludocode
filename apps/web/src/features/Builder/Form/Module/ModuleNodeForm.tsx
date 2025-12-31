import { courseFormOpts, withForm } from "@/constants/form/formKit.ts";
import { ludoNavigation } from "@/constants/ludoNavigation.tsx";
import { Button } from "@ludocode/external/ui/button";
import { LessonListForm } from "../Lesson/LessonListForm.tsx";
import { BuilderNodeWrapper } from "@/features/Builder/Components/Wrapper/builder-node-wrapper.tsx";
import { BuilderNode } from "@/features/Builder/Components/Tree/builder-node.tsx";
import { StatusDot } from "@ludocode/design-system/primitives/status-dot";
import { EditNodeDialog } from "@/features/Builder/Components/Dialog/EditNodeDialog.tsx";
import { ChevronRightIcon } from "lucide-react";
import { router } from "@/main.tsx";

export const ModuleNodeForm = withForm({
  ...courseFormOpts,
  props: {
    removeModule: null as ((thisId: string, index: number) => void) | null,
    updateOrder: null as ((oldIndex: number, newIndex: number) => void) | null,
    courseId: "" as string,
    moduleId: "" as string,
    modulesLength: 0 as number,
    currentModuleId: "" as string | undefined,
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
                              <StatusDot
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

type CollapsibleButtonProps = {
  onClick?: () => void;
  isExpanded: boolean;
};

export function CollapsibleButton({
  onClick,
  isExpanded,
}: CollapsibleButtonProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className="flex h-6 w-6 items-center hover:cursor-pointer justify-center rounded hover:bg-ludoGrayLight/60"
    >
      <ChevronRightIcon
        className={`h-4 w-4 text-white hover:cursor-pointer transition-transform ${
          isExpanded ? "rotate-90" : "rotate-0"
        }`}
      />
    </button>
  );
}
