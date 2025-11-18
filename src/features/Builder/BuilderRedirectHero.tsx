import { DefaultHero } from "@/components/Molecules/Hero/DefaultHero";

type BuilderRedirectHeroProps = {openCreateCourse: () => void};

export function BuilderRedirectHero({openCreateCourse}: BuilderRedirectHeroProps) {
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
