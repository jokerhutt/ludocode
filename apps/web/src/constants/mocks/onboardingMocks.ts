import type { OnboardingFormContent } from "@ludocode/types";

export const onboardingContent: OnboardingFormContent = {
  courseContent: [
    {
      courseId: "598ccbea-4957-4569-81cb-ea901b62c329",
      title: "Python",
      description: "Python is a simple programming language",
    },
  ],
  careerContent: [
    {
      courseId: "598ccbea-4957-4569-81cb-ea901b62c329",
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
