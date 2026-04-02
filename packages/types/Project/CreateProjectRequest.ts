import { type ProjectFileSnapshot } from "./ProjectFileSnapshot";
import { type ProjectType } from "./ProjectSnapshot"

export type CreateProjectRequest = {
    projectName: string;
    projectType: ProjectType;
    requestHash: string
    files: ProjectFileSnapshot[];
    entryFilePath: string;
    
}