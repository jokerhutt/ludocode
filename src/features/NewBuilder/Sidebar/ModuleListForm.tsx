import { SidebarMenu } from "@/components/ui/sidebar";
import { courseFormOpts, withForm } from "@/form/formKit";
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
          return (
            <SidebarMenu>
              {modules.map((module, index) => (
                <ModuleNodeForm
                  currentLessonId={currentLessonId}
                  currentModuleId={currentModuleId}
                  form={form}
                  moduleId={module.moduleId}
                  index={index}
                  courseId={courseId}
                />
              ))}
            </SidebarMenu>
          );
        }}
      </form.AppField>
    );
  },
});
