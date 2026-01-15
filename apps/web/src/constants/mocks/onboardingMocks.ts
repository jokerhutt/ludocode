import type { OnboardingFormContent } from "@ludocode/types";

export const onboardingContent: OnboardingFormContent = {
  stepTitles: {
    name: "What would you like to be called?",
    career: "What direction in programming interests you most?",
    course: "What language would you like to start with?",
    experience: "Do you have any programming experience?",
  },
  courseContent: [
    {
      courseId: "75975805-3f02-43c2-9106-c990d944dfd2",
      title: "Python",
      description: "Python is a simple programming language",
    },
  ],
  careerContent: [
    {
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
