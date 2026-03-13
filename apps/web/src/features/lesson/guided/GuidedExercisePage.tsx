import { useMemo } from "react";
import type { ExecutableTest } from "@ludocode/types/Exercise/LudoExercise.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { useLessonContext } from "@/features/lesson/context/useLessonContext";
import { ProjectProvider } from "@/features/project/workbench/context/ProjectContext.tsx";
import { useProjectContext } from "@/features/project/workbench/context/ProjectContext.tsx";
import { CodeRunnerProvider } from "@/features/project/workbench/context/CodeRunnerContext.tsx";
import { useFeatureEnabledCheck } from "@/features/auth/hooks/useFeatureEnabledCheck";
import { GuidedExecutableWorkbench } from "./GuidedExecutableWorkbench";

type GuidedExercisePage = {};

export function GuidedExercisePage({}: GuidedExercisePage) {
  const { currentExercise, phase } = useLessonContext();

  const interaction = currentExercise.interaction;
  if (!interaction || interaction.type !== "EXECUTABLE") {
    return null;
  }

  const projectSnapshot = useMemo<ProjectSnapshot | null>(() => {
    const executableFiles = interaction.files;
    if (!executableFiles.length) return null;

    const firstLanguage = executableFiles[0].language;

    const projectFiles = executableFiles.map((file) => ({
      tempId: `${currentExercise.id}`,
      path: file.name,
      language: file.language,
      content: file.content,
    }));

    return {
      projectId: currentExercise.id,
      projectName: `guided-${currentExercise.id}`,
      projectLanguage: firstLanguage,
      files: projectFiles,
      entryFileId: projectFiles[0].tempId!,
    };
  }, [currentExercise.id, interaction.files]);

  const showBlockOutput =
    interaction.showOutput && (phase === "CORRECT" || phase === "SUBMITTED");

  if (!projectSnapshot) {
    return (
      <div className="col-span-full p-8">
        <p className="text-ludo-white-dim">
          Unable to load guided executable files.
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
