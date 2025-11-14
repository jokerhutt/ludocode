import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import { ProjectsGrid } from "./ProjectsGrid";
import { CustomIcon } from "@/components/Atoms/Icons/CustomIcon";

type PlaygroundPageProps = {};

export function PlaygroundPage({}: PlaygroundPageProps) {

  const projects : ProjectSnapshot[] = [
    {projectId: "123", projectName: "Untitled Project", files: []}
  ]

  const iconName = {
    python: "Python",
  }

  return (
    <div className="grid col-span-full h-full grid-cols-12">
      <div className="col-span-1 bg-ludoGrayDark border-r-2 border-r-ludoGrayLight lg:col-span-2"></div>
      <div className="col-span-10 relative lg:col-span-8 flex flex-col gap-8 items-stretch justify-start min-w-0">
        <ProjectsGrid>
            {projects.map((project) => (
                <div className="w-full h-40 hover:cursor-pointer border-ludoLightPurple border p-4 rounded-xl bg-ludoGrayLight">
                    <h4 className="text-white text-xl underline-offset-3 underline">{project.projectName}</h4>
                </div>
            ))}
        </ProjectsGrid>
      </div>
      <div className="col-span-1 border-l-2 border-l-ludoGrayLight bg-ludoGrayDark lg:col-span-2"></div>
    </div>
  );
}
