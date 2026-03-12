export type LudoLesson = {
  id: string;
  title: string;
  orderIndex: number;
  isCompleted: boolean;
};
export type LessonType = "GUIDED" | "NORMAL"
export type LessonStatus = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED";
