import { DefaultHero } from "@/components/design-system/blocks/hero/default-hero.tsx";

type BuilderHubHeroProps = { openCreateCourse: () => void };

export function BuilderHubHero({ openCreateCourse }: BuilderHubHeroProps) {
  const title = "Builder";
  const subtitle =
    "Here you are able to create and edit courses and their content";
  const buttonText = "Add Course";

  return (
    <DefaultHero
      onClick={openCreateCourse}
      title={title}
      subtitle={subtitle}
      buttonText={buttonText}
    />
  );
}
