import { useState, useCallback } from "react";
import type { ProjectFileSnapshot } from "@ludocode/types/Project/ProjectFileSnapshot.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import type { LanguageMetadata } from "@ludocode/types/Project/LanguageMetadata.ts";
import { nextName } from "@/features/project/util/filenameUtil.ts";

type Args = {
  project: ProjectSnapshot;
};

export function useProject({ project }: Args): UseProjectResponse {
  const [files, setFiles] = useState<ProjectFileSnapshot[]>(() =>
    project.files.map((f) => ({ ...f })),
  );

  const initialEntryId = project.entryFilePath ?? project.files[0]?.path;

  if (!initialEntryId) {
    throw new Error("project must have at least one file");
  }

  const [entryFileId, setEntryFileId] = useState(initialEntryId);

  const { projectLanguage } = project;

  const [current, setCurrent] = useState(0);

  const deleteFile = useCallback(
    (path: string) => {
      setFiles((prev) => {
        if (prev.length <= 1) return prev;

        const idx = prev.findIndex((f) => f.path === path);
        if (idx === -1) return prev;

        const fileBeingDeleted = prev[idx];

        if (fileBeingDeleted.path === entryFileId) return prev;

        const next = prev.slice();
        next.splice(idx, 1);

        setCurrent((cur) => {
          if (cur < idx) return cur;
          return Math.max(0, cur - 1);
        });

        return next;
      });
    },
    [entryFileId],
  );

  const renameFile = useCallback(
    (oldPath: string, newNameRaw: string) => {
      setFiles((prev) => {
        const idx = prev.findIndex((f) => f.path === oldPath);
        if (idx === -1) return prev;

        const file = prev[idx];
        const extension = file.language.extension;

        let base = newNameRaw.trim();
        if (!base) return prev;

        base = base.split("/").pop()!.split("\\").pop()!;

        let finalName = base;
        if (!finalName.endsWith(extension)) {
          finalName = `${finalName}${extension}`;
        }

        const otherFiles = prev.filter((_, i) => i !== idx);

        const bare = finalName.endsWith(extension)
          ? finalName.slice(0, -extension.length)
          : finalName;

        const uniqueName = nextName(otherFiles, bare, extension);

        if (oldPath === entryFileId) {
          setEntryFileId(uniqueName);
        }

        const next = prev.slice();
        next[idx] = { ...file, path: uniqueName };
        return next;
      });
    },
    [entryFileId],
  );

  const updateContent = useCallback(
    (val: string) => {
      setFiles((fs) => {
        const next = fs.slice();
        next[current] = { ...next[current], content: val };
        return next;
      });
    },
    [current],
  );

  const addFile = useCallback(
    (language?: LanguageMetadata) => {
      setFiles((fs) => {
        const fileLanguage = language ?? projectLanguage;
        const { base, extension } = fileLanguage;
        const name = nextName(fs, base, extension);
        const file: ProjectFileSnapshot = {
          tempId: crypto.randomUUID(),
          path: `${name}`,
          language: fileLanguage,
          content: "",
        };
        const next = [...fs, file];
        setCurrent(next.length - 1);
        return next;
      });
    },
    [projectLanguage],
  );

  const resetToSnapshot = useCallback((snapshot: ProjectSnapshot) => {
    const nextFiles = snapshot.files.map((f) => ({ ...f }));
    if (nextFiles.length === 0) return;

    const nextEntryId = snapshot.entryFilePath ?? nextFiles[0]?.path;

    if (!nextEntryId) return;

    setFiles(nextFiles);
    setEntryFileId(nextEntryId);

    const nextCurrentIndex = Math.max(
      0,
      nextFiles.findIndex((f) => f.path === nextEntryId),
    );
    setCurrent(nextCurrentIndex);
  }, []);

  const active = files[current];
  const currentFileId: string | null = active?.path ?? null;

  return {
    project,
    files,
    current,
    currentFileId,
    active: active,
    setCurrent,
    entryFileId,
    updateContent,
    deleteFile,
    renameFile,
    addFile,
    resetToSnapshot,
  };
}

export type UseProjectResponse = {
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
  current: number;
  currentFileId: string | null;
  active: ProjectFileSnapshot;
  entryFileId: string;
  setCurrent: (index: number) => void;
  updateContent: (value: string) => void;
  deleteFile: (path: string) => void;
  renameFile: (oldPath: string, newNameRaw: string) => void;
  addFile: (language?: LanguageMetadata) => void;
  resetToSnapshot: (snapshot: ProjectSnapshot) => void;
};
