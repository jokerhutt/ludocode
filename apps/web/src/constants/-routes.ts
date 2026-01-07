export const RP_INDEX = `/`;

export const routes = {
  root: "/",
  auth: {
    login: `/auth/login`,
    register: `/auth/register`,
    demo: `/demo/`,
  },
  hub: {
    courses: `/_app/_hub/courses`,
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
