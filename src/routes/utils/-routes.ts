export const RP_INDEX = `/`;

export const routes = {
  root: "/",
  auth: {
    authPage: `/auth/`,
    demo: `/demo/`,
  },
  hub: {
    courses: `/_app/_hub/courses`,
    builder: `/_app/_hub/builder`,
    project: `/_app/_hub/projects`,

    module: {
      root: `/_app/_hub/learn`,
      moduleHub: `/_app/_hub/learn/$courseId/$moduleId`,
    },
    profile: {
      root: `/_app/_hub/profile`,
      user: `/_app/_hub/profile/$userId`,
    },
  },
  lesson: {
    lessonPage: `/_app/lesson/$courseId/$moduleId/$lessonId`,
  },
  build: {
    root: `/_app/_desktopguard/build`,
    builderPage: `/_app/_desktopguard/build/$courseId`,
  },
  completion: {
    syncPage: `/_app/sync/$lessonId`,
    completionPage: `/_app/completion/$courseId/$moduleId/$lessonId`,
  },
  project: {
    projectPage: `/_app/_desktopguard/project/$projectId`,
  },
  onboarding: {
    base: `/_app/onboarding/`,
    start: `/_app/onboarding/career`,
  },
} as const;
