import { useState, useCallback } from "react";
import { extFor, nextName } from "./playgroundFileUtils";
import type { ProjectFileSnapshot } from "@/Types/Playground/ProjectFileSnapshot";
import type { ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import type { LanguageType } from "@/Types/Playground/LanguageType";

export type ProjectFile = { path: string; language: string; content: string };

export type ProjectFileChoice = {
  name: string;
  lang: LanguageType;
  base: string;
};

type Args = {
  project: ProjectSnapshot;
};

export function useProject({ project }: Args) {
  const [files, setFiles] = useState<ProjectFileSnapshot[]>(project.files);

  const addFileChoices: ProjectFileChoice[] = [
    { name: "Python", lang: "python", base: "script" },
  ];

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

  const renameFile = useCallback(() => {}, []);

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

  const addFile = useCallback(
    (lang: LanguageType, base: string = "untitled") => {
      setFiles((fs) => {
        const ext = extFor(lang);
        const name = nextName(fs, base, ext);
        const file: ProjectFileSnapshot = {
          path: `${name}`,
          language: lang,
          content: "",
        };
        const next = [...fs, file];
        setCurrent(next.length - 1);
        return next;
      });
    },
    []
  );

  return {
    files,
    current,
    active: files[current],
    setCurrent,
    addFileChoices,
    updateContent,
    deleteFile,
    addFile,
  };
}
