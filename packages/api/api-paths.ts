import { DiscussionTopic } from "@ludocode/types";

export type ApiConfig = {
  apiPrefix: string;
  apiUrl: string;
  adminPrefix: string;
};

export function createApiPaths({
  apiPrefix = "/api/v1",
  apiUrl,
  adminPrefix,
}: ApiConfig) {
  const API_PREFIX = apiPrefix;
  const API_PATH = apiUrl;
  const ADMIN_PREFIX = adminPrefix;
  const BASE = API_PATH + API_PREFIX;
  const ADMIN_BASE = BASE + ADMIN_PREFIX;

  return {
    ai: {
      base: `${BASE}/ai`,
      completions: `${BASE}/ai/completions`,
    },

    analytics: {
      base: `${BASE}/analytics`,
    },

    auth: {
      base: `${BASE}/auth`,
      firebase: `${BASE}/auth/firebase`,
      checkAdmin: `${ADMIN_BASE}/auth/check`,
      me: `${BASE}/auth/me`,
      logout: `${BASE}/auth/logout`,
    },

    banner: {
      base: `${BASE}/banners`,
      adminBase: `${ADMIN_BASE}/banners`,
      byAdminId: (bannerId: number) => `${ADMIN_BASE}/banners/${bannerId}`,
    },

    catalog: {
      base: `${BASE}/catalog`,
      courses: `${BASE}/catalog/courses`,
      courseTree: (courseId: string) =>
        `${BASE}/catalog/courses/${courseId}/tree`,
      modules: (moduleIds: string) => `${BASE}/catalog/modules?${moduleIds}`,
    },

    credits: {
      base: `${BASE}/credits`,
    },

    features: {
      base: `${BASE}/features`,
    },

    languages: {
      base: `${BASE}/languages`,
      adminBase: `${ADMIN_BASE}/languages`,
      byAdminIdVisiblity: (id: number) =>
        `${ADMIN_BASE}/languages/${id}/visibility`,
      byAdminIdDisabledMessage: (id: number) =>
        `${ADMIN_BASE}/languages/${id}/disabled-message`,
      byId: (languageId: number) => `${BASE}/languages/${languageId}`,
      byAdminId: (languageId: number) =>
        `${ADMIN_BASE}/languages/${languageId}`,
    },

    lessons: {
      base: `${BASE}/lessons`,
      adminBase: `${ADMIN_BASE}/lessons`,
      lessons: (lessonIds: string) => `${BASE}/lessons?${lessonIds}`,
      lessonExercises: (lessonId: string) =>
        `${BASE}/lessons/${lessonId}/exercises`,
      byLessonCurriculum: (lessonId: string) =>
        `${ADMIN_BASE}/lessons/${lessonId}`,
    },

    progress: {
      coins: {
        base: `${BASE}/progress/coins`,
        byUserIds: (userIds: string) => `${BASE}/progress/coins?${userIds}`,
      },
      completion: {
        base: `${BASE}/progress/completion`,
      },
      courses: {
        base: `${BASE}/progress/courses`,
        byIds: (courseIds: string) => `${BASE}/progress/courses?${courseIds}`,
        stats: `${BASE}/progress/courses/stats`,
        statsByIds: (courseIds: string) =>
          `${BASE}/progress/courses/stats?${courseIds}`,
        enrolled: `${BASE}/progress/courses/enrolled`,
        current: `${BASE}/progress/courses/current`,
        reset: (courseId: string) =>
          `${BASE}/progress/courses/${courseId}/reset`,
      },
      streak: {
        base: `${BASE}/progress/streak`,
        weekly: `${BASE}/progress/streak?mode=weekly`,
      },
    },

    discussion: {
      base: `${BASE}/discussion`,
      byEntityIdAndTopic: (entityId: string, topic: DiscussionTopic) =>
        `${BASE}/discussion/${entityId}/${topic}`,
      like: `${BASE}/discussion/messages/like`,
      likes: (messageIds: string) => `${BASE}/discussion/messages/like?${messageIds}`,
      likeById: (messageId: string) => `${BASE}/discussion/messages/${messageId}/like`
    },

    projects: {
      base: `${BASE}/projects`,
      public: `${BASE}/projects/public`,
      likes: (projectIds: string) => `${BASE}/projects/like?${projectIds}`,
      byId: (projectId: string) => `${BASE}/projects/${projectId}`,
      byIdPublic: (projectId: string) => `${BASE}/projects/public/${projectId}`,
      like: (projectId: string) => `${BASE}/projects/${projectId}/like`,
      name: (projectId: string) => `${BASE}/projects/${projectId}/name`,
      visibility: (projectId: string) =>
        `${BASE}/projects/${projectId}/visibility`,
      duplicate: (projectId: string) =>
        `${BASE}/projects/${projectId}/duplicate`,
      basePaginated: (page: number, size: number) =>
        `${BASE}/projects?page=${page}&size=${size}`,
      publicPaginated: (page: number, size: number) =>
        `${BASE}/projects/public?page=${page}&size=${size}`,
    },

    runner: {
      base: `${BASE}/runner`,
      ws: `${BASE}/ws/runner`,
      execute: `${BASE}/runner/executions`,
    },

    snapshots: {
      base: `${ADMIN_BASE}/snapshots`,
      course: `${ADMIN_BASE}/snapshots/course`,
      courses: `${ADMIN_BASE}/snapshots/courses`,
      byCourseStatus: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/${courseId}/status`,
      byCourseCurriculum: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/curriculum/${courseId}`,
      byCourseCurriculumSubject: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/${courseId}/subject`,
      byCourseCurriculumLanguage: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/${courseId}/language`,
      byCourseCurriculumIcon: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/${courseId}/icon`,
      byCourseCurriculumTitle: (courseId: string) =>
        `${ADMIN_BASE}/snapshots/${courseId}/title`,
      byCourse: (courseId: string) => `${ADMIN_BASE}/snapshots/${courseId}`,
    },

    subjects: {
      base: `${BASE}/subjects`,
      adminBase: `${ADMIN_BASE}/subjects`,
      byId: (subjectId: number) => `${BASE}/subjects/${subjectId}`,
      byAdminId: (subjectId: number) => `${ADMIN_BASE}/subjects/${subjectId}`,
    },

    feedback: {
      base: `${BASE}/feedback`,
    },

    subscriptions: {
      base: `${BASE}/subscription`,
      checkout: `${BASE}/subscription/checkout`,
      confirm: `${BASE}/subscription/confirm`,
      manage: `${BASE}/subscription/manage`,
      plans: `${BASE}/subscription/plans`,
    },

    preferences: {
      base: `${BASE}/preferences`,
      careers: `${BASE}/preferences/careers`,
    },

    users: {
      base: `${BASE}/users`,
      byIds: (userIds: string) => `${BASE}/users?${userIds}`,
      me: `${BASE}/users/me`,
      avatar: `${BASE}/users/avatar`,
    },

    external: {
      piston: {
        runtimes: `https://emkc.org/api/v2/piston/runtimes`,
      },
    },
  };
}
