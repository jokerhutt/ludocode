import type { OnboardingFormContent } from "@ludocode/types";

export const onboardingContent: OnboardingFormContent = {
  courseContent: [
    {
      courseId: "75975805-3f02-43c2-9106-c990d944dfd2",
      title: "Python",
      description: "Python is a simple programming language",
    },
  ],
  careerContent: [
    {
      courseId: "75975805-3f02-43c2-9106-c990d944dfd2",
      title: "Data science",
      careerType: "DATA",
      description: "Data scientists",
      topPath: "Python",
    },
  ],
  previousExperienceContent: [
    {
      content: "No, i've never programmed before",
      value: false,
    },
    {
      content: "Yes, I have programmed before",
      value: true,
    },
  ],
};
