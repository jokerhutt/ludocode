
export type CourseProgress = {
    id: string;
    userId: string;
    courseId: string;
    currentLessonId: string;
    moduleId: string;
    isComplete: boolean;
}