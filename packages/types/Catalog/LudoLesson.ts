import { ProjectSnapshot } from "../Project/ProjectSnapshot";

export type LudoLesson = {
  id: string;
  title: string;
  orderIndex: number;
  isCompleted: boolean;
  projectSnapshot?: ProjectSnapshot;
};
export type LessonType = "GUIDED" | "NORMAL"
export type LessonStatus = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED";
