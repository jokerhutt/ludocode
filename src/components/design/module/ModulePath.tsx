import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import { ModulePathRow } from "./ModulePathRow";
type ModulePathProps = { lessons: LudoLesson[]; currentLessonId: string };

export function ModulePath({ lessons, currentLessonId }: ModulePathProps) {
  return lessons.map((lesson: LudoLesson, i: number) => {
    const isCurrent = currentLessonId === lesson.id;

    return <ModulePathRow key={lesson.id} lesson={lesson} isCurrent={isCurrent} index={i} />;
  });
}
