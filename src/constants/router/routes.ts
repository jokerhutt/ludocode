export const RP_INDEX = `/`;

export const routes = {
  auth: {
    authPage: `/auth`,
    demo: `/demo`,
  },
  hub: {
    coursesHub: `/`,
    buildHub: `/builder/hub`,
    projectHub: `/project/hub`,
    module: {
      moduleRedirect: `/modules`,
      moduleHub: `/course/$courseId/module/$moduleId`,
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
