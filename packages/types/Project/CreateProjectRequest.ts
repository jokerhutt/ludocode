import { ProjectType } from "./ProjectSnapshot"

export type CreateProjectRequest = {
    projectName: string;
    projectLanguageId: number;
    projectType: ProjectType;
    requestHash: string
}