import { ThinNodeButton } from "@/components/design-system/atoms/button/thin-node-button.tsx";

type SelectLessonButtonProps = {
  selectLesson: (lessonId: string) => void;
  lessonId: string;
};

export function SelectLessonButton({
  selectLesson,
  lessonId,
}: SelectLessonButtonProps) {
  return (
    <ThinNodeButton text="Select" onClick={() => selectLesson(lessonId)} />
  );
}
