export type CourseProgressWithEnrolled = {
  courseProgress: CourseProgress;
  enrolled: string[];
};

export type CourseProgress = {
  id: string;
  userId: string;
  courseId: string;
  moduleId: string;
  isComplete: boolean;
  updatedAt: string;
};
