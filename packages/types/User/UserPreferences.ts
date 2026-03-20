import type { OnboardingCareerType } from "../Onboarding/OnboardingCourse"

export type UserPreferences = {
    userId: string,
    hasExperience: boolean,
    chosenPath: OnboardingCareerType,
    aiEnabled: boolean,
    audioEnabled: boolean
}