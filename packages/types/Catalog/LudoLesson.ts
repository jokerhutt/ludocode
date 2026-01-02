export type LudoLesson = {
  id: string;
  title: string;
  orderIndex: number;
  isCompleted: boolean;
};

export type LessonStatus = "LOCKED" | "DEFAULT" | "COMPLETE" | "MASTERED";
