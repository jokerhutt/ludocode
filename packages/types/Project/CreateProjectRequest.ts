import { ProjectFileSnapshot } from "./ProjectFileSnapshot";
import { ProjectType } from "./ProjectSnapshot"

export type CreateProjectRequest = {
    projectName: string;
    projectType: ProjectType;
    requestHash: string
    files: ProjectFileSnapshot[];
    entryFilePath: string;
    
}