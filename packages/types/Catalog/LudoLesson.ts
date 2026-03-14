import type { ProjectSnapshot } from "../Project/ProjectSnapshot";

export type LudoLesson = {
  id: string;
  title: string;
  orderIndex: number;
  lessonType: LessonType;
  isCompleted: boolean;
  projectSnapshot?: ProjectSnapshot;
};
export type LessonType = "GUIDED" | "NORMAL";
export type LessonStatus = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED";
