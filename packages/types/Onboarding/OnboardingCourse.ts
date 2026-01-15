export type StageKey = "name" | "course" | "career" | "experience";

export type OnboardingFormContent = {
  stepTitles: Record<StageKey, string>;

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
  careerType: CareerType;
  title: string;
  description: string;
  topPath: string;
};
