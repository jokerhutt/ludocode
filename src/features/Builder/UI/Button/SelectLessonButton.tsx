import { ThinNodeButton } from "@/components/LudoComponents/Atoms/Button/ThinNodeButton";

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
