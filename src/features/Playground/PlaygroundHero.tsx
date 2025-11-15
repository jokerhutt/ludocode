import { Button } from "@/components/ui/button";

type PlaygroundHeroProps = {openCreateProject: () => void};

export function PlaygroundHero({openCreateProject}: PlaygroundHeroProps) {
  return (
          <div className="pb-2 flex flex-col gap-2 text-white">
            <h1 className="text-2xl">Your Projects</h1>
            <div className="flex items-center justify-between">
              <p>Here you will see an overview of your projects</p>
              <Button onClick={() => openCreateProject()}>Add Project</Button>
            </div>
          </div>
  );
}