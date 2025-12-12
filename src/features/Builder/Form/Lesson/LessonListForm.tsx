import { courseFormOpts, withForm } from "@/constants/form/formKit";
import { ludoNavigation } from "@/routes/utils/-ludoNavigation.tsx";
import { Button } from "@/components/external/ui/button";
import { newLesson } from "../../Util/NewExerciseTemplates";
import { AddLessonRow } from "../../UI/Button/AddLessonRow";
import { TreeItem } from "@/components/design-system/atoms/tree/tree-item.tsx";
import { BuilderNodeWrapper } from "@/components/design-system/blocks/wrapper/builder-node-wrapper.tsx";
import { BuilderNode } from "@/components/design-system/atoms/tree/builder-node.tsx";
import { StatusButtonField } from "@/components/design-system/atoms/status/status-button-field.tsx";
import { EditNodeDialog } from "@/features/Builder/UI/Dialog/EditNodeDialog.tsx";
import { router } from "@/main";

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
        ludoNavigation.builder.toBuilderLesson(courseId, moduleId, lessonId)
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
                ludoNavigation.builder.toBuilderModule(courseId, moduleId)
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
                          return <StatusButtonField hasError={!!hasError} />;
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
