import type { ExecutableFile, ProjectSnapshot } from "@ludocode/types";

export function buildExecutableProjectSnapshot(
  exerciseId: string,
  executableFiles: ExecutableFile[],
): ProjectSnapshot | null {
  if (!executableFiles.length) return null;

  const firstLanguage = executableFiles[0].language;

  const projectFiles = executableFiles.map((file) => ({
    tempId: file.id,
    path: file.name,
    language: file.language,
    content: file.content,
  }));

  return {
    projectId: exerciseId,
    projectName: `guided-${exerciseId}`,
    projectLanguage: firstLanguage,
    files: projectFiles,
    entryFileId: projectFiles[0].tempId,
  };
}