import { useOnboardingContext } from "@/hooks/Context/Onboarding/OnboardingContext";

export function HasExperienceStep() {
  const { content, hook } = useOnboardingContext();
  const { hasProgrammingExperience, chooseProgrammingExperience } = hook;

  const isSelected = (value: boolean) => value === hasProgrammingExperience;

  return (
    <>
      <h1 className="text-2xl text-center font-bold text-white">
        Do you have any programming experience?
      </h1>
      <div className="grid lg:grid-cols-2 py-6 gap-6">
        {content.previousExperienceContent.map((peContent) => (
          <div
            onClick={() => chooseProgrammingExperience(peContent.value)}
            className={`p-6 hover:cursor-pointer ${
              isSelected(peContent.value)
                ? "border-2 border-ludoLightPurple"
                : ""
            } min-h-40 flex flex-col items-center justify-center rounded-2xl bg-ludoGrayLight`}
          >
            <h1 className="text-white text-xl font-bold">
              {peContent.content}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
}
