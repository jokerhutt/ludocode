import { DefaultHero } from "@/components/design-system/blocks/hero/default-hero.tsx";

type ProjectHubHeroProps = { openCreateProject: () => void };

export function ProjectHubHero({ openCreateProject }: ProjectHubHeroProps) {
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
