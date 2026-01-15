import type { CareerType } from "@ludocode/types";
import { useOnboardingContext } from "../Context/OnboardingContext";
import { OnboardingStageShell } from "../Components/Zone/OnboardingStageShell";
import { AuthInputField } from "@/features/Auth/Components/Input/AuthInputField";

export function CareerChoiceStep() {
  const { content, draftApi } = useOnboardingContext();
  const { draft, setDraft } = draftApi;

  const { careerContent, stepTitles } = content;

  const selectedColor = (career: CareerType) =>
    career == draft.career ? "border-2 border-ludoLightPurple" : "";

  return (
    <OnboardingStageShell title={stepTitles.career}>
      {careerContent.map((cContent) => (
        <div
          onClick={() => setDraft({ career: cContent.careerType })}
          className={`p-6 hover:cursor-pointer ${selectedColor(
            cContent.careerType
          )} min-h-40 flex flex-col items-center gap-2 justify-center rounded-2xl bg-ludoGrayLight`}
        >
          <h1 className="text-white text-xl font-bold">{cContent.title}</h1>
          <p className="text-white">
            Top languages: <span className="font-bold">{cContent.topPath}</span>
          </p>
        </div>
      ))}
    </OnboardingStageShell>
  );
}

export function CourseChoiceStep() {
  const { content, draftApi } = useOnboardingContext();
  const { draft, setDraft } = draftApi;
  const { courseContent, stepTitles } = content;

  const selectedCourse = draft.course ?? null;
  const isSelected = (courseId: string) => courseId == selectedCourse;

  return (
    <OnboardingStageShell title={stepTitles.course}>
      {courseContent.map((cContent) => (
        <div
          onClick={() => setDraft({ course: cContent.courseId })}
          className={`p-6 hover:cursor-pointer ${
            isSelected(cContent.courseId)
              ? "border-2 border-ludoLightPurple"
              : ""
          } min-h-40 flex flex-col items-center justify-center rounded-2xl bg-ludoGrayLight`}
        >
          <h1 className="text-white text-xl font-bold">{cContent.title}</h1>
        </div>
      ))}
    </OnboardingStageShell>
  );
}

export function HasExperienceStep() {
  const { content, draftApi } = useOnboardingContext();
  const { draft, setDraft } = draftApi;
  const { previousExperienceContent, stepTitles } = content;

  const selectedExperience = draft.experience;
  const isSelected = (value: boolean) => value === selectedExperience;

  return (
    <OnboardingStageShell title={stepTitles.experience}>
      {previousExperienceContent.map((peContent) => (
        <div
          onClick={() => setDraft({ experience: peContent.value })}
          className={`p-6 hover:cursor-pointer ${
            isSelected(peContent.value) ? "border-2 border-ludoLightPurple" : ""
          } min-h-40 flex flex-col items-center justify-center rounded-2xl bg-ludoGrayLight`}
        >
          <h1 className="text-white text-xl font-bold">{peContent.content}</h1>
        </div>
      ))}
    </OnboardingStageShell>
  );
}

export function UsernameChoiceStep() {
  const { content, draftApi } = useOnboardingContext();
  const { draft, setDraft } = draftApi;
  const { stepTitles } = content;

  return (
    <OnboardingStageShell title={stepTitles.name}>
      <AuthInputField
        value={draft.username ?? ""}
        setValue={(value) => setDraft({ username: value })}
        title="Choose your username"
      />
    </OnboardingStageShell>
  );
}
