import { PythonIcon } from "@/components/Atoms/Icons/CustomIcon";
import { FileActionsButton } from "@/components/Molecules/Popover/FileActionsButton";
import { FileActionsPopover } from "@/components/Molecules/Popover/FileActionsPopover";
import { useModifyProject } from "@/Hooks/Queries/Mutations/useModifyProject";
import { ludoNavigation } from "@/routes/ludoNavigation";
import { router } from "@/routes/router";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import { EllipsisVertical } from "lucide-react";

type ProjectCardProps = { project: ProjectSnapshot };

export function ProjectCard({ project }: ProjectCardProps) {


  const {handleRenameProject, handleDeleteProject} = useModifyProject(project.projectId)

  return (
    <div
      onClick={() =>
        router.navigate(ludoNavigation.playground.toProject(project.projectId))
      }
      className="w-full hover:cursor-pointer flex justify-between border-ludoLightPurple border p-4 rounded-xl bg-ludoGrayLight"
    >
      <div className="flex flex-col">
        <div className="w-full items-center pb-1 text-white flex gap-2">
          <p>Project - {project.projectLanguage}</p>
          <PythonIcon color="white" className="h-4" />
        </div>
        <h4 className="text-white text-lg font-bold">{project.projectName}</h4>
      </div>
      <FileActionsPopover
        targetId={project.projectId}
        deleteItem={() => handleDeleteProject()}
        renameItem={() => () => null}
      >
        <EllipsisVertical
          onClick={(e) => e.stopPropagation()}
          className="text-white hover:cursor-pointer hover:text-ludoLightPurple"
        />
      </FileActionsPopover>
    </div>
  );
}
