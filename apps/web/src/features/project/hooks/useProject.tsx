import { useState, useCallback } from "react";
import { Languages, type LanguageKey, type ProjectFileSnapshot } from "@ludocode/types/Project/ProjectFileSnapshot.ts";
import type { ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
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

  const [current, setCurrent] = useState(0);

  const deleteFile = useCallback(
    (path: string) => {
      if (files.length <= 1) return;

      const idx = files.findIndex((f) => f.path === path);
      if (idx === -1) return;

      if (files[idx].path === entryFileId) return;

      setFiles((prev) => {
        const next = prev.slice();
        next.splice(idx, 1);
        return next;
      });

      setCurrent((cur) => {
        if (cur < idx) return cur;
        return Math.max(0, cur - 1);
      });
    },
    [entryFileId, files],
  );

  const renameFile = useCallback(
    (oldPath: string, newNameRaw: string) => {
      const idx = files.findIndex((f) => f.path === oldPath);
      if (idx === -1) return;

      const file = files[idx];
      const extension = Languages[file.language].extension

      let base = newNameRaw.trim();
      if (!base) return;

      base = base.split("/").pop()!.split("\\").pop()!;

      let finalName = base;
      if (!finalName.endsWith(extension)) {
        finalName = `${finalName}${extension}`;
      }

      const otherFiles = files.filter((_, i) => i !== idx);

      const bare = finalName.endsWith(extension)
        ? finalName.slice(0, -extension.length)
        : finalName;

      const uniqueName = nextName(otherFiles, bare, extension);

      setFiles((prev) => {
        const next = prev.slice();
        next[idx] = { ...next[idx], path: uniqueName };
        return next;
      });

      if (oldPath === entryFileId) {
        setEntryFileId(uniqueName);
      }
    },
    [entryFileId, files],
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
    (languageName: LanguageKey) => {
      const { base, extension } = Languages[languageName];
      const name = nextName(files, base, extension);
      const file: ProjectFileSnapshot = {
        tempId: crypto.randomUUID(),
        path: name,
        language: languageName,
        content: "",
      };

      setFiles((fs) => [...fs, file]);
      setCurrent(files.length);
    },
    [files],
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
  addFile: (language: LanguageKey) => void;
  resetToSnapshot: (snapshot: ProjectSnapshot) => void;
};
