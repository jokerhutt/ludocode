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
    <OnboardingStageShell
      title="Choose your path"
      subtitle="Pick the track that matches your goals."
    >
      {careers.map((career) => (
        <WideOnboardingOption
          key={career.id}
          dataTestId={`onb-career-${career.choice}`}
          isSelected={career.choice === draft.career}
          onClick={() => setDraft({ career: career.choice })}
        >
          <h1 className="text-white text-xl font-bold">{career.title}</h1>
          <p className="text-ludoAltText text-sm leading-relaxed">
            {career.description}
          </p>
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
    <OnboardingStageShell
      title="Choose your language"
      subtitle="Select the programming language you'd like to start learning."
    >
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
    <OnboardingStageShell
      title="Programming experience?"
      subtitle="This helps us tailor the content to your skill level."
    >
      <WideOnboardingOption
        dataTestId="onb-exp-true"
        isSelected={draft.experience === true}
        onClick={() => setDraft({ experience: true })}
      >
        <span className="text-lg font-semibold">Yes</span>
        <span className="text-ludoAltText text-sm">
          I've written code before
        </span>
      </WideOnboardingOption>

      <WideOnboardingOption
        dataTestId="onb-exp-false"
        isSelected={draft.experience === false}
        onClick={() => setDraft({ experience: false })}
      >
        <span className="text-lg font-semibold">No</span>
        <span className="text-ludoAltText text-sm">
          I'm completely new to coding
        </span>
      </WideOnboardingOption>
    </OnboardingStageShell>
  );
}

export function UsernameChoiceStep() {
  const draft = useOnboardingDraftStore((s) => s.draft);
  const setDraft = useOnboardingDraftStore((s) => s.setDraft);

  return (
    <OnboardingStageShell
      title="Choose your username"
      subtitle="This is how other learners will see you."
    >
      <div className="col-span-full flex justify-center">
        <div className="w-full max-w-sm">
          <LudoInput
            dataTestId="username-input"
            value={draft.username ?? ""}
            setValue={(value) => setDraft({ username: value })}
            title="Username"
            variant="alt"
            placeholder="Enter a username…"
          />
          <p className="mt-2 text-xs text-ludo-text-dim">
            At least 3 characters
          </p>
        </div>
      </div>
    </OnboardingStageShell>
  );
}
