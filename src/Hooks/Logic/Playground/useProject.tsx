import { useState, useCallback } from "react";
import { nextName } from "./playgroundFileUtils";
import type { ProjectFileSnapshot } from "@/Types/Playground/ProjectFileSnapshot";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import {
  LANGUAGE_MAP,
  type LanguageType,
} from "@/Types/Playground/LanguageType";

export type ProjectFileChoice = {
  name: string;
  lang: LanguageType;
  base: string;
};

type Args = {
  project: ProjectSnapshot;
};

export function useProject({ project }: Args): UseProjectResponse {
  const [files, setFiles] = useState<ProjectFileSnapshot[]>(() =>
    project.files.map((f) => ({ ...f }))
  );
  const { fileTemplate, fileExtension } = LANGUAGE_MAP[project.projectLanguage];
  const { lang, base } = fileTemplate;

  const [current, setCurrent] = useState(0);

  const deleteFile = useCallback((path: string) => {
    setFiles((prev) => {
      const idx = prev.findIndex((f) => f.path === path);
      if (idx === -1) return prev;

      const next = prev.slice();
      next.splice(idx, 1);

      setCurrent((cur) => {
        if (next.length === 0) return 0;
        if (cur < idx) return cur;
        if (cur === idx) return Math.max(0, cur - 1);
        return Math.max(0, cur - 1);
      });

      return next;
    });
  }, []);

  const renameFile = useCallback((oldPath: string, newNameRaw: string) => {
    setFiles((prev) => {
      const idx = prev.findIndex((f) => f.path === oldPath);
      if (idx === -1) return prev;

      const file = prev[idx];

      let base = newNameRaw.trim();
      if (!base) return prev;

      base = base.split("/").pop()!.split("\\").pop()!;

      let finalName = base;
      if (!finalName.endsWith(fileExtension)) {
        finalName = `${finalName}${fileExtension}`;
      }

      const otherFiles = prev.filter((_, i) => i !== idx);

      const bare = finalName.endsWith(fileExtension)
        ? finalName.slice(0, -fileExtension.length)
        : finalName;

      const uniqueName = nextName(otherFiles, bare, fileExtension);

      const next = prev.slice();
      next[idx] = { ...file, path: uniqueName };
      return next;
    });
  }, []);

  const updateContent = useCallback(
    (val: string) => {
      setFiles((fs) => {
        const next = fs.slice();
        next[current] = { ...next[current], content: val };
        return next;
      });
    },
    [current]
  );

  const addFile = useCallback(() => {
    setFiles((fs) => {
      const name = nextName(fs, base, fileExtension);
      const file: ProjectFileSnapshot = {
        tempId: crypto.randomUUID(),
        path: `${name}`,
        language: lang,
        content: "",
      };
      const next = [...fs, file];
      setCurrent(next.length - 1);
      return next;
    });
  }, []);

  const active = files[current];
  const currentFileId: string | null = active.id ?? null;

  return {
    project,
    files,
    current,
    currentFileId,
    active: active,
    setCurrent,
    updateContent,
    deleteFile,
    renameFile,
    addFile,
  };
}

export type UseProjectResponse = {
  project: ProjectSnapshot;
  files: ProjectFileSnapshot[];
  current: number;
  currentFileId: string | null;
  active: ProjectFileSnapshot;
  setCurrent: (index: number) => void;
  updateContent: (value: string) => void;
  deleteFile: (path: string) => void;
  renameFile: (oldPath: string, newNameRaw: string) => void;
  addFile: () => void;
};
