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

  module: (courseName: string, position: number) => ({
    to: RP_MODULE,
    params: { courseName, position },
  }),

  startLesson: (courseName: string, lessonId: number) =>
    ludoNavigation.lesson(courseName, lessonId, 0),

  lesson: (courseName: string, lessonId: number, exercise: number) => ({
    to: RP_LESSON,
    params: { courseName, lessonId },
    search: { exercise },
  }),
};
