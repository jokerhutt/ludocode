import { SidebarMenu } from "@/components/ui/sidebar";
import { courseFormOpts, withForm } from "@/form/formKit";
import { ModuleNodeForm } from "./ModuleNodeForm";
import { TreeItem } from "../TreeItem";
import { BuilderNode } from "../BuilderNode";
import { router } from "@/routes/router";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { Button } from "@/components/ui/button";
import { EditNodeDialog } from "../Dialog/EditNodeDialog";
import { newLesson } from "../Util/NewExerciseTemplates";
import { StatusButton } from "@/components/Atoms/Button/StatusButton";
import { StatusButtonField } from "../TanstackForm/StatusButtonField";

export const LessonListForm = withForm({
  ...courseFormOpts,
  props: {
    courseId: "" as string,
    moduleId: "" as string,
    isExpanded: false as boolean,
    moduleIndex: 0 as number,
    currentLessonId: "" as string,
  },
  render: ({
    form,
    courseId,
    currentLessonId,
    moduleId,
    isExpanded,
    moduleIndex,
  }) => {
    const selectLesson = (lessonId: string) => {
      router.navigate(
        ludoNavigation.build.toBuilderLesson(courseId, moduleId, lessonId)
      );
    };

    return (
      <form.Field name={`modules[${moduleIndex}].lessons`} mode="array">
        {(fieldArray) => {
          const lessons = fieldArray.state.value;

          const rearrangeLesson = (oldIndex: number, newIndex: number) => {
            fieldArray.moveValue(oldIndex, newIndex);
          };

          const addLesson = () => {
            const orderIndex = lessons.length;
            fieldArray.pushValue(newLesson(orderIndex));
          };

          const removeLesson = (thisId: string, index: number) => {
            const lessons = fieldArray.state.value;
            const isCurrent = currentLessonId === thisId;

            const nextId = lessons[index + 1]?.id ?? lessons[index - 1]?.id;

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
            <div className={`ml-6 ${isExpanded ? "flex" : "hidden"} flex-col`}>
              {lessons.map((lesson, index) => (
                <TreeItem key={lesson.id}>
                  <BuilderNode
                    isSelected={
                      !!currentLessonId && lesson.id == currentLessonId
                    }
                    title={lesson.title}
                    status
                  >
                    <Button
                      onClick={() => selectLesson(lesson.id)}
                      className="h-6"
                    >
                      Select
                    </Button>
                    <EditNodeDialog
                      removeItem={() => removeLesson?.(lesson.id, index)}
                      updateOrder={rearrangeLesson}
                      arrayLength={lessons.length}
                      lessonIndex={index}
                      moduleIndex={moduleIndex}
                      type="lesson"
                      form={form}
                    >
                      <Button className="h-6">Edit</Button>
                    </EditNodeDialog>

                    <form.AppField
                      name={`modules[${moduleIndex}].lessons[${index}]`}
                    >
                      {(lessonField) => {
                        const hasError =
                          lessonField.state.meta.errors?.[0]?.message;
                        return <StatusButtonField hasError={!!hasError} />;
                      }}
                    </form.AppField>
                  </BuilderNode>
                </TreeItem>
              ))}
              <TreeItem>
                <Button className="h-8 mt-2" onClick={() => addLesson()}>
                  Add Lesson
                </Button>
              </TreeItem>
            </div>
          );
        }}
      </form.Field>
    );
  },
});
