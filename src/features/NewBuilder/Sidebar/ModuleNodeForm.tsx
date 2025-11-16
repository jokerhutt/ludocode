import { courseFormOpts, withForm } from "@/form/formKit";
import { buildRoute, router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { BuilderNode } from "../BuilderNode";
import { ExpandNodeButton } from "../ExpandNodeButton";
import { LessonListForm } from "./LessonListForm";

export const ModuleNodeForm = withForm({
  ...courseFormOpts,
  props: {
    courseId: "" as string,
    moduleId: "" as string,
    currentModuleId: "" as string,
    currentLessonId: "" as string,
    index: 0 as number,
  },
  render: ({
    form,
    courseId,
    moduleId,
    index,
    currentModuleId,
    currentLessonId,
  }) => {
    return (
      <form.Field name={`modules[${index}]`}>
        {(field) => {
          const module = field.state.value;

          const isExpanded = module.isExpanded;

          const isSelected =
            currentModuleId != null && currentModuleId == moduleId;

          const selectModule = () => {
            router.navigate(
              ludoNavigation.build.toBuilderModule(courseId, moduleId)
            );
          };

          return (
            <div className="flex flex-col">
              <div className="flex items-center gap-4 pr-4">
                <BuilderNode
                  isSelected={isSelected}
                  onSelect={() => selectModule()}
                  title={module.title}
                  status
                />
                <ExpandNodeButton
                  isExpanded={module.isExpanded}
                  onClick={() =>
                    field.handleChange({ ...module, isExpanded: !isExpanded })
                  }
                />
              </div>

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
