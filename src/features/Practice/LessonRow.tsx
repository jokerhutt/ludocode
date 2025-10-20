import type { LudoTutorial } from "../../Types/Exercise/LudoTutorial";

type LessonRowProps = { lesson: LudoTutorial; isSelected: boolean };

export function LessonRow({lesson, isSelected}: LessonRowProps) {

  const selectedStyle = isSelected ? "bg-green-200/30" : ""

  return (
    <div className={`p-2 flex flex-col ${selectedStyle} border-b`}>
      <p>Title: {lesson.title}</p>
      <p>Id: {lesson.id}</p>
      <p>Order: {lesson.orderIndex}</p>
    </div>
  );
}
