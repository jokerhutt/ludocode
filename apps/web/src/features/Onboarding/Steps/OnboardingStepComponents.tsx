import { useOnboardingContext } from "../Context/OnboardingContext";
import { OnboardingStageShell } from "../Components/Zone/OnboardingStageShell";
import { WideOnboardingOption } from "../Components/WideOnboardingOption";
import { LudoInput } from "@ludocode/design-system/primitives/input.tsx";
import { useOnboardingDraftStore } from "../Store/OnboardingDraft";

export function CareerChoiceStep() {
  const { careers } = useOnboardingContext();
  const draft = useOnboardingDraftStore((s) => s.draft);
  const setDraft = useOnboardingDraftStore((s) => s.setDraft);

  return (
    <OnboardingStageShell title="Choose your path">
      {careers.map((career) => (
        <WideOnboardingOption
          key={career.id}
          dataTestId={`onb-career-${career.choice}`}
          isSelected={career.choice === draft.career}
          onClick={() => setDraft({ career: career.choice })}
        >
          <h1 className="text-white text-xl font-bold">{career.title}</h1>
          <p className="text-white">{career.description}</p>
        </WideOnboardingOption>
      ))}
    </OnboardingStageShell>
  );
}

export function CourseChoiceStep() {
  const { courses } = useOnboardingContext();
  const draft = useOnboardingDraftStore((s) => s.draft);
  const setDraft = useOnboardingDraftStore((s) => s.setDraft);

  return (
    <OnboardingStageShell title="Choose your language">
      {courses.map((course) => (
        <WideOnboardingOption
          key={course.id}
          dataTestId={`onb-course-${course.id}`}
          isSelected={course.id === draft.course}
          onClick={() => setDraft({ course: course.id })}
        >
          <h1 className="text-white text-xl font-bold">{course.title}</h1>
        </WideOnboardingOption>
      ))}
    </OnboardingStageShell>
  );
}

export function HasExperienceStep() {
  const draft = useOnboardingDraftStore((s) => s.draft);
  const setDraft = useOnboardingDraftStore((s) => s.setDraft);

  return (
    <OnboardingStageShell title="Programming experience?">
      <WideOnboardingOption
        dataTestId="onb-exp-true"
        isSelected={draft.experience === true}
        onClick={() => setDraft({ experience: true })}
      >
        Yes
      </WideOnboardingOption>

      <WideOnboardingOption
        dataTestId="onb-exp-false"
        isSelected={draft.experience === false}
        onClick={() => setDraft({ experience: false })}
      >
        No
      </WideOnboardingOption>
    </OnboardingStageShell>
  );
}

export function UsernameChoiceStep() {
  const draft = useOnboardingDraftStore((s) => s.draft);
  const setDraft = useOnboardingDraftStore((s) => s.setDraft);

  return (
    <OnboardingStageShell title="Choose your username">
      <LudoInput
        dataTestId="username-input"
        value={draft.username ?? ""}
        setValue={(value) => setDraft({ username: value })}
        title="Username"
      />
    </OnboardingStageShell>
  );
}
