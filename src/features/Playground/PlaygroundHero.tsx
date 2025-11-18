import { DefaultHero } from "@/components/Molecules/Hero/DefaultHero";
import { Button } from "@/components/ui/button";

type PlaygroundHeroProps = { openCreateProject: () => void };

export function PlaygroundHero({ openCreateProject }: PlaygroundHeroProps) {
  const title = "Your Projects";
  const subtitle = "Here you will see an overview of your projects";
  const buttonText = "Add Project";

  return (
    <DefaultHero
      onClick={openCreateProject}
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
    />
  );
}
