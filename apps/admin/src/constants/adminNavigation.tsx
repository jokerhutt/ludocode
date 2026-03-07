// AUTH
import { Route as authRoute } from "@/routes/auth";
import { Route as modifyLanguagePageRoute } from "@/routes/_app/language/$languageId";
import { Route as createLanguagePageRoute } from "@/routes/_app/language/create";
import { Route as coursesHubRoute } from "@/routes/_app/hub/courses.tsx";
import { Route as modifyCoursePageRoute } from "@/routes/_app/curriculum/$courseId/index";
import { Route as LessonCurriculumPageRoute } from "@/routes/_app/curriculum/$courseId/lesson/$lessonId";
import { Route as subjectsPageRoute } from "@/routes/_app/subjects/index";

export const adminNavigation = {
  auth: () => ({ to: authRoute.to }),
  hub: {
    courses: {
      toCoursesHub: () => ({
        to: coursesHubRoute.to,
      }),
    },
  },
  curriculum: {
    toCourse: (courseId: string) => ({
      to: modifyCoursePageRoute.to,
      params: { courseId: courseId },
    }),
    toLesson: (courseId: string, lessonId: string) => ({
      to: LessonCurriculumPageRoute.to,
      params: { courseId: courseId, lessonId: lessonId },
    }),
  },
  subjects: {
    toSubjects: () => ({
      to: subjectsPageRoute.to,
    }),
  },
  language: {
    toLanguage: (languageId: number) => ({
      to: modifyLanguagePageRoute.to,
      params: { languageId: String(languageId) },
    }),
    toCreateLanguage: () => ({
      to: createLanguagePageRoute.to,
    }),
  },
};
