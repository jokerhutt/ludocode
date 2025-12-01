import { SidebarMenu } from "@/components/ui/sidebar";
import { courseFormOpts, withForm } from "@/constants/form/formKit";
import { Button } from "@/components/ui/button";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { newModule } from "@/features/Builder/Util/NewExerciseTemplates";
import { ModuleNodeForm } from "./ModuleNodeForm";

export const ModuleListForm = withForm({
  ...courseFormOpts,
  props: {
    courseId: "" as string,
    currentModuleId: "" as string,
    currentLessonId: "" as string,
  },
  render: ({ form, courseId, currentLessonId, currentModuleId }) => {
    return (
      <form.AppField name="modules" mode="array">
        {(fieldArray) => {
          const modules = fieldArray.state.value;
          const addModule = () => {
            const modulesLength = modules.length;
            fieldArray.pushValue(newModule(modulesLength));
          };

          const rearrangeModule = (oldIndex: number, newIndex: number) => {
            fieldArray.moveValue(oldIndex, newIndex);
          };

          const removeModule = (thisId: string, index: number) => {
            const mods = fieldArray.state.value;
            const isCurrent = currentModuleId === thisId;

            const nextId =
              mods[index + 1]?.moduleId ?? mods[index - 1]?.moduleId;

            if (isCurrent) {
              router.navigate(
                nextId
                  ? ludoNavigation.build.toBuilderModule(courseId, nextId)
                  : ludoNavigation.build.toSelectCourse()
              );
            }

            queueMicrotask(() => fieldArray.removeValue(index));
          };

          return (
            <div className="flex gap-4 flex-col">
              <Button onClick={() => addModule()} className="h-8 w-40">
                Add Module
              </Button>
              <SidebarMenu>
                {modules.map((module, index) => (
                  <ModuleNodeForm
                    key={module.moduleId}
                    updateOrder={rearrangeModule}
                    removeModule={removeModule}
                    modulesLength={modules.length}
                    currentLessonId={currentLessonId}
                    currentModuleId={currentModuleId}
                    form={form}
                    moduleId={module.moduleId}
                    index={index}
                    courseId={courseId}
                  />
                ))}
              </SidebarMenu>
            </div>
          );
        }}
      </form.AppField>
    );
  },
});
