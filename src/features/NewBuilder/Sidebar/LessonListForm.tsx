import { SidebarMenu } from "@/components/ui/sidebar";
import { courseFormOpts, withForm } from "@/form/formKit";
import { ModuleNodeForm } from "./ModuleNodeForm";
import { TreeItem } from "../TreeItem";
import { BuilderNode } from "../BuilderNode";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";

export const LessonListForm = withForm({
  ...courseFormOpts,
  props: {
    courseId: "" as string,
    moduleId: "" as string,
    isExpanded: false as boolean,
    moduleIndex: 0 as number,
    currentLessonId: "" as string,
  },
  render: ({ form, courseId, currentLessonId, moduleId, isExpanded, moduleIndex }) => {
    const selectLesson = (lessonId: string) => {
      router.navigate(
        ludoNavigation.build.toBuilderLesson(courseId, moduleId, lessonId)
      );
    };

    return (
      <form.Field name={`modules[${moduleIndex}].lessons`} mode="array">
        {(fieldArray) => {
          const lessons = fieldArray.state.value;
          return (
            <div className={`ml-6 ${isExpanded ? "flex" : "hidden"} flex-col`}>
              {lessons.map((lesson, index) => (
                <TreeItem key={index}>
                  <BuilderNode
                    isSelected={!!currentLessonId && lesson.id == currentLessonId}
                    onSelect={() => selectLesson(lesson.id)}
                    title={lesson.title}
                    status
                  />
                </TreeItem>
              ))}
            </div>
          );
        }}
      </form.Field>
    );
  },
});
