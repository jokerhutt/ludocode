import type { OnboardingFormContent } from "@ludocode/types";

export const onboardingContent: OnboardingFormContent = {
  courseContent: [
    {
      courseId: "7441852b-f392-49a5-a397-1558322385b2",
      title: "Python",
      description: "Python is a simple programming language",
    },
  ],
  careerContent: [
    {
      courseId: "7441852b-f392-49a5-a397-1558322385b2",
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
