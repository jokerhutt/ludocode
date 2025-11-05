import { useOnboardingContext } from "../OnboardingContext";
import type { CareerType } from "@/Types/Onboarding/OnboardingCourse";

export function CareerChoiceStep() {
  const { content, hook } = useOnboardingContext();

  const { selectedCareer, chooseCareer } = hook;

  const selectedColor = (career: CareerType) =>
    career == selectedCareer ? "border-2 border-ludoLightPurple" : "";

  return (
    <>
      <h1 className="text-2xl text-center font-bold text-white">
        Which direction in Programming Interests you most?
      </h1>
      <div className="grid grid-cols-3 py-10 gap-6">
        {content.careerContent.map((cContent) => (
          <div
            onClick={() => chooseCareer(cContent.careerType)}
            className={`p-6 hover:cursor-pointer ${selectedColor(
              cContent.careerType
            )} min-h-40 flex flex-col items-center gap-2 justify-center rounded-2xl bg-ludoGrayLight`}
          >
            <h1 className="text-white text-xl font-bold">{cContent.title}</h1>
            <p className="text-white">Top languages: <span className="font-bold">{cContent.topPath}</span></p>
          </div>
        ))}
      </div>
    </>
  );
}
