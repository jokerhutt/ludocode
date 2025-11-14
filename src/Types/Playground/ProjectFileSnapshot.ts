import type { LanguageType } from "./LanguageType";

export type ProjectFileSnapshot = {
    id?: string;
    path: string;
    language: LanguageType;
    content: string;
}