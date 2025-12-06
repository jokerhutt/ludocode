export const RP_INDEX = `/`;

export const routes = {
  root: "/",
  auth: {
    authPage: `/auth`,
    demo: `/demo`,
  },
  hub: {
    courses: `/courses`,
    builder: `/builder`,
    project: `/projects`,

    module: {
      root: `/learn`,
      moduleHub: `/learn/$courseId/$moduleId`,
    },
    profile: {
      root: `/profile`,
      user: `/profile/$userId`,
    },
  },
  lesson: {
    lessonPage: `/lesson/$courseId/$moduleId/$lessonId`,
  },
  build: {
    root: `/build`,
    builderPage: `/build/course/$courseId`,
  },
  completion: {
    syncPage: `/sync/$lessonId`,
    completionPage: `/completion/$courseId/$moduleId/$lessonId`,
  },
  project: {
    projectPage: `/project/$projectId`,
  },
  onboarding: {
    base: `/onboarding`,
    start: `/onboarding/career`,
  },
} as const;
