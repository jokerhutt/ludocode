export type OnboardingFormContent = {
    courseContent: OnboardingCourseType[]
    careerContent: OnboardingCareerType[]
    previousExperienceContent: PreviousExperienceType[]
}

export type OnboardingCourseType = {
    courseId: string;
    title: string;
    description: string;
}

export type CareerType = "Data Science" | "IOS DEVELOPER"

export type PreviousExperienceType = {
    content: string;
    value: boolean
}

export type OnboardingCareerType = {
    courseId: string;
    careerType: CareerType
    title: string;
    description: string;
    topPath: string;
}