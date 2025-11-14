import type { ProjectFileSnapshot } from "./ProjectFileSnapshot";

export type ProjectSnapshot = {
    projectId: string;
    projectName: string;
    files: ProjectFileSnapshot[]
}