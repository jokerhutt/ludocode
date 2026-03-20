import { ProjectSnapshot, ProjectVisibility } from "./ProjectSnapshot";

export type UserProjectView = {
  snapshot: ProjectSnapshot;
  mode: "EDIT" | "READONLY";
  ownerId?: string;
  visibility: ProjectVisibility;
  deleteAt?: string;
};
