import { Button } from "@ludocode/external/ui/button";
import { newLesson } from "@/features/Builder/Util/NewExerciseTemplates.ts";
import { AddLessonRow } from "@/features/Builder/Components/Button/AddLessonRow.tsx";
import { TreeItem } from "@/features/Builder/Components/Tree/tree-item.tsx";
import { BuilderNodeWrapper } from "@/features/Builder/Components/Wrapper/builder-node-wrapper.tsx";
import { BuilderNode } from "@/features/Builder/Components/Tree/builder-node.tsx";
import { StatusDot } from "@ludocode/design-system/primitives/status-dot.tsx";
import { EditNodeDialog } from "@/features/Builder/Components/Dialog/EditNodeDialog.tsx";
import { router } from "@/main.tsx";
import { courseFormOpts, withForm } from "@/constants/form/formKit.ts";
import { adminNavigation } from "@/constants/adminNavigation.tsx";

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
      const modules = form.state.values.modules;
      const lessons = modules[moduleIndex].lessons;
      const newLessonIndex = lessons.findIndex(
        (lesson) => lesson.id == lessonId
      );
      if (newLessonIndex < 0) return;
      const firstExerciseOfNewLesson = lessons[newLessonIndex].exercises[0];
      if (!firstExerciseOfNewLesson) return;
      router.navigate(
        adminNavigation.builder.toBuilderExercise(
          courseId,
          moduleId,
          lessonId,
          firstExerciseOfNewLesson.id
        )
      );
    };

    return (
      <form.Field
        key={currentLessonId}
        name={`modules[${moduleIndex}].lessons`}
        mode="array"
      >
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
            const isCurrent = currentLessonId === thisId;
            fieldArray.removeValue(index);
            if (isCurrent) {
              router.navigate(
                adminNavigation.builder.toBuilderModule(courseId, moduleId)
              );
            }
          };

          return (
            <div className={`ml-6 ${isExpanded ? "flex" : "hidden"} flex-col`}>
              {lessons.map((lesson, index) => (
                <TreeItem key={lesson.id}>
                  <BuilderNodeWrapper>
                    <BuilderNode
                      key={lesson.id}
                      onSelect={() => selectLesson(lesson.id)}
                      isSelected={
                        !!currentLessonId && lesson.id == currentLessonId
                      }
                      title={lesson.title}
                      status
                    >
                      <form.AppField
                        key={lesson.id}
                        name={`modules[${moduleIndex}].lessons[${index}]`}
                      >
                        {(lessonField) => {
                          const hasError =
                            lessonField.state.meta.errors?.[0]?.message;
                          return <StatusDot hasError={!!hasError} />;
                        }}
                      </form.AppField>
                    </BuilderNode>
                    <EditNodeDialog
                      removeItem={() => removeLesson?.(lesson.id, index)}
                      updateOrder={rearrangeLesson}
                      arrayLength={lessons.length}
                      lessonIndex={index}
                      moduleIndex={moduleIndex}
                      type="lesson"
                      form={form}
                    >
                      <Button className="h-6" asChild>
                        <span>Edit</span>
                      </Button>
                    </EditNodeDialog>
                  </BuilderNodeWrapper>
                </TreeItem>
              ))}
              <AddLessonRow addLesson={() => addLesson()} />
            </div>
          );
        }}
      </form.Field>
    );
  },
});
