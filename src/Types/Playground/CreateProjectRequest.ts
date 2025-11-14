import type { LanguageType } from "./LanguageType"

export type CreateProjectRequest = {
    projectName: string,
    projectLanguage: LanguageType,
    requestHash: string
}