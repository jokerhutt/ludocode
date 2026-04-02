// AUTH
import { Route as authRoute } from "@/routes/auth";
import { Route as coursesHubRoute } from "@/routes/_app/hub/courses.tsx";
import { Route as bannersHubRoute } from "@/routes/_app/hub/banners";
import { Route as modifyCoursePageRoute } from "@/routes/_app/curriculum/$courseId/index";
import { Route as LessonCurriculumPageRoute } from "@/routes/_app/curriculum/$courseId/lesson/$lessonId";

export const adminNavigation = {
  auth: () => ({ to: authRoute.to }),
  hub: {
    courses: {
      toCoursesHub: () => ({
        to: coursesHubRoute.to,
      }),
    },
    banners: {
      toBannersHub: () => ({
        to: bannersHubRoute.to,
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
};
