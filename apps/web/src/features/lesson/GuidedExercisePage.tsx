import type { ExecutableTest } from "@ludocode/types/Exercise/LudoExercise.ts";
import {
  useLessonEvaluation,
  useLessonExercise,
} from "@/features/lesson/context/useLessonContext";
import { ProjectProvider } from "@/features/project/workbench/context/ProjectContext.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { CodeRunnerProvider } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck";
import { GuidedExecutableWorkbench } from "./guided/GuidedExecutableWorkbench";
import { useGuidedExercise } from "@/features/lesson/guided/context/useGuidedExerciseContext.tsx";

export function GuidedExercisePage() {
  const { lesson, currentExercise } = useLessonExercise();
  const { isComplete } = useLessonEvaluation();
  const { reviewSubmissionSnapshot, resetSnapshot } = useGuidedExercise();

  const interaction = currentExercise.interaction;
  if (!interaction || interaction.type !== "EXECUTABLE") {
    return null;
  }

  const projectSnapshot =
    reviewSubmissionSnapshot ??
    resetSnapshot ??
    lesson.projectSnapshot ??
    null;

  const showBlockOutput = interaction.showOutput && isComplete;

  if (!projectSnapshot) {
    return (
      <div className="col-span-full p-8">
        <p className="text-ludo-white-dim">
          Unable to load guided project snapshot.
        </p>
      </div>
    );
  }

  return (
    <ProjectProvider key={currentExercise.id} project={projectSnapshot}>
      <GuidedExecutableCodeRunner
        tests={interaction.tests}
        showBlockOutput={showBlockOutput}
      />
    </ProjectProvider>
  );
}

function GuidedExecutableCodeRunner({
  tests,
  showBlockOutput,
}: {
  tests: ExecutableTest[];
  showBlockOutput: boolean;
}) {
  const { project, files, entryFileId } = useProjectContext();
  const runnerFeature = useFeatureEnabledCheck({ feature: "isPistonEnabled" });

  return (
    <CodeRunnerProvider
      project={project}
      files={files}
      disabled={!runnerFeature.enabled}
      entryFileId={entryFileId}
    >
      <GuidedExecutableWorkbench
        tests={tests}
        showBlockOutput={showBlockOutput}
      />
    </CodeRunnerProvider>
  );
}
