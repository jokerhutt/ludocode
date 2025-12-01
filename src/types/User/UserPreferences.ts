import type { UUID } from "crypto"
import type { OnboardingCareerType } from "../Onboarding/OnboardingCourse"

export type UserPreferences = {
    userId: UUID,
    hasExperience: boolean,
    chosenPath: OnboardingCareerType
}