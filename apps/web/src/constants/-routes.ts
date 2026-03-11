export const RP_INDEX = `/`;

export const routes = {
  root: "/",
  auth: {
    login: `/auth/login`,
    register: `/auth/register`,
    demo: `/demo/`,
  },
  hub: {
    courses: `/app/_hub/courses`,
    project: `/app/_hub/projects`,

    module: {
      root: `/app/_hub/learn`,
      moduleHub: `/app/_hub/learn/$courseId/$moduleId`,
    },
    profile: {
      root: `/app/_hub/profile`,
      user: `/app/_hub/profile/$userId`,
    },
  },
  lesson: {
    lessonPage: `/app/lesson/$courseId/$moduleId/$lessonId`,
  },
  completion: {
    syncPage: `/app/sync/$lessonId`,
    completionPage: `/app/completion/$courseId/$moduleId/$lessonId`,
  },
  project: {
    projectPage: `/app/_desktopguard/project/$projectId`,
  },
  onboarding: {
    base: `/app/onboarding/`,
    start: `/app/onboarding/career`,
  },
} as const;
