import {
  RP_COURSE,
  RP_LESSON,
  RP_MODULE,
  RP_PROFILE,
  RP_BUILD,
  RP_MODULE_REDIRECT,
  RP_ME,
} from "../constants/routePaths";

export const ludoNavigation = {
  courseRoot: () => ({ to: RP_COURSE }),

  moduleRedirect: () => ({ to: RP_MODULE_REDIRECT }),

  build: () => ({ to: RP_BUILD }),

  me: () => ({ to: RP_ME }),

  module: (courseId: string, position: number) => ({
    to: RP_MODULE,
    params: { courseId, position },
  }),

  startLesson: (courseId: string, lessonId: string) =>
    ludoNavigation.lesson(courseId, lessonId, 0),

  lesson: (courseId: string, lessonId: string, exercise: number) => ({
    to: RP_LESSON,
    params: { courseId, lessonId },
    search: { exercise },
  }),
};
