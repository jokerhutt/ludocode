import type { StepProps } from "@/Types/Onboarding/OnboardingSteps";
import { useOnboardingContext } from "../OnboardingContext";
import type { CareerType } from "@/Types/Onboarding/OnboardingCourse";

type CareerChoiceStepProps = {};

export function CareerChoiceStep() {
  const { content, hook } = useOnboardingContext();

  const { selectedCareer, chooseCareer } = hook;

  const isSelected = (career: CareerType) => career == selectedCareer;

  return (
    <>
      <h1 className="text-2xl text-center font-bold text-white">
        Which direction in Programming Interests you most?
      </h1>
      <div className="grid grid-cols-3 py-6 gap-6">
        {content.careerContent.map((cContent) => (
          <div
            onClick={() => chooseCareer(cContent.careerType)}
            className={`p-6 ${
              isSelected(cContent.careerType)
                ? "border-2 border-ludoLightPurple"
                : ""
            } min-h-40 flex flex-col items-center justify-center rounded-2xl bg-ludoGrayLight`}
          >
            <h1 className="text-white text-xl font-bold">{cContent.title}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
