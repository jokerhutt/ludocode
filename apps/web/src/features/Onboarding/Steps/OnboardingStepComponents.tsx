import { useOnboardingContext } from "../Context/OnboardingContext";
import { OnboardingStageShell } from "../Components/Zone/OnboardingStageShell";
import { AuthInputField } from "@/features/Auth/Components/Input/AuthInputField";
import { WideOnboardingOption } from "../Components/WideOnboardingOption";

export function CareerChoiceStep() {
  const { content, draftApi } = useOnboardingContext();
  const { draft, setDraft } = draftApi;

  const { careerContent, stepTitles } = content;


  return (
    <OnboardingStageShell title={stepTitles.career}>
      {careerContent.map((cContent) => (
        <WideOnboardingOption
          isSelected={cContent.careerType == draft.career}
          onClick={() => setDraft({ career: cContent.careerType })}
        >
          <h1 className="text-white text-xl font-bold">{cContent.title}</h1>
          <p className="text-white">
            Top languages: <span className="font-bold">{cContent.topPath}</span>
          </p>
        </WideOnboardingOption>
      ))}
    </OnboardingStageShell>
  );
}

export function CourseChoiceStep() {
  const { content, draftApi } = useOnboardingContext();
  const { draft, setDraft } = draftApi;
  const { courseContent, stepTitles } = content;

  const selectedCourse = draft.course ?? null;

  return (
    <OnboardingStageShell title={stepTitles.course}>
      {courseContent.map((cContent) => (
        <WideOnboardingOption
          isSelected={cContent.courseId == selectedCourse}
          onClick={() => setDraft({ course: cContent.courseId })}
        >
          <h1 className="text-white text-xl font-bold">{cContent.title}</h1>
        </WideOnboardingOption>
      ))}
    </OnboardingStageShell>
  );
}

export function HasExperienceStep() {
  const { content, draftApi } = useOnboardingContext();
  const { draft, setDraft } = draftApi;
  const { previousExperienceContent, stepTitles } = content;

  const selectedExperience = draft.experience;

  return (
    <OnboardingStageShell title={stepTitles.experience}>
      {previousExperienceContent.map((peContent) => (
        <WideOnboardingOption
          onClick={() => setDraft({ experience: peContent.value })}
          isSelected={peContent.value == selectedExperience}
        >
          <h1 className="text-white text-xl font-bold">{peContent.content}</h1>
        </WideOnboardingOption>
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
