import { PythonIcon } from "@/components/Atoms/Icons/CustomIcon.tsx";
import { FileActionsButton } from "@/components/Molecules/Popover/FileActionsButton.tsx";
import { FileActionsPopover } from "@/components/Molecules/Popover/FileActionsPopover.tsx";
import { useModifyProject } from "@/Hooks/Queries/Mutations/useModifyProject.tsx";
import { ludoNavigation } from "@/routes/ludoNavigation.tsx";
import { router } from "@/routes/router.tsx";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot.ts";
import { EllipsisVertical } from "lucide-react";

type ProjectCardProps = { project: ProjectSnapshot };

export function ProjectCard({ project }: ProjectCardProps) {
  const { handleRenameProject, handleDeleteProject } = useModifyProject(
    project.projectId
  );

  return (
    <div
      onClick={() =>
        router.navigate(ludoNavigation.playground.toProject(project.projectId))
      }
      className="w-full text-white hover:cursor-pointer flex justify-between border-ludoLightPurple border p-4 rounded-xl bg-ludoGrayLight"
    >
      <div className="flex flex-col">
        <div className="w-full items-center pb-1 text-white flex gap-2">
          <p>Project - {project.projectLanguage}</p>
          <PythonIcon color="white" className="h-4" />
        </div>
        <h4 className="text-white text-lg font-bold">{project.projectName}</h4>
      </div>
      <div>
        <FileActionsButton
          variant="secondary"
          fileName={project.projectName}
          renameFile={handleRenameProject}
          deleteFile={handleDeleteProject}
        />
      </div>
    </div>
  );
}
