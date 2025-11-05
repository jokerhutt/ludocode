import type { OnboardingFormContent } from "@/Types/Onboarding/OnboardingCourse";

export const onboardingContent: OnboardingFormContent = {
  courseContent: [
    {
      courseId: "1",
      title: "Python",
      description: "Python is a simple programming language",
    },
    {
      courseId: "2",
      title: "Swift",
      description: "Swift is by apple",
    },
  ],
  careerContent: [
    {
      courseId: "1",
      title: "Data science",
      careerType: "Data Science",
      description: "Data scientists",
      topPath: "Python",
    },
    {
      courseId: "2",
      title: "IOS Developer",
      careerType: "IOS DEVELOPER",
      description: "Ios Developer",
      topPath: "Swift",
    },
  ],
};