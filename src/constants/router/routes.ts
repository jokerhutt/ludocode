export const RP_INDEX = `/`;

export const routes = {
  auth: {
    authPage: `/auth`,
    demo: `/demo`,
  },
  hub: {
    root: "/hub",
    courses: `/`,
    builder: `/builder/hub`,
    project: `/project/hub`,
    module: {
      root: `/modules`,
      moduleHub: `course/$courseId/module/$moduleId`,
    },
    profile: {
      root: `/profile`,
      user: `$userId`,
    },
  },
  lesson: {
    lessonPage: `/course/$courseId/lesson/$lessonId`,
  },
  build: {
    builderPage: `/build/course/$courseId`,
  },
  completion: {
    syncPage: `/lesson/$lessonId/sync`,
    completionPage: `/completion/$courseId/lesson/$lessonId`,
  },
  project: {
    projectPage: `/project/$projectId`,
  },
  onboarding: {
    base: `/onboarding`,
    start: `/onboarding/career`,
  },
} as const;
