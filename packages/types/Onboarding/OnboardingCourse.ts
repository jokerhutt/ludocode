export type OnboardingFormContent = {
  courseContent: OnboardingCourseType[];
  careerContent: OnboardingCareerType[];
  previousExperienceContent: PreviousExperienceType[];
};

export type OnboardingSubmission = {
  selectedUsername: string;
  chosenPath: CareerType;
  chosenCourse: string;
  hasProgrammingExperience: boolean;
};

export type OnboardingCourseType = {
  courseId: string;
  title: string;
  description: string;
};

export type CareerType = "DATA";

export type PreviousExperienceType = {
  content: string;
  value: boolean;
};

export type OnboardingCareerType = {
  courseId: string;
  careerType: CareerType;
  title: string;
  description: string;
  topPath: string;
};
