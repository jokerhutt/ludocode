import { useState,  useCallback } from "react";
import { extFor, nextName, type Lang } from "./playgroundFileUtils";

export type ProjectFile = { path: string; language: string; content: string };

export type ProjectFileChoice = { name: string; lang: Lang; base: string };

export function useProject() {
  const [files, setFiles] = useState<ProjectFile[]>([
    { path: "inmem:///main.py", language: "python", content: 'print("hi")\n' },
    { path: "inmem:///card.py", language: "python", content: "# todo\n" },
  ]);

  const addFileChoices: ProjectFileChoice[] = [
    { name: "Python", lang: "python", base: "script" },
  ];

  const [current, setCurrent] = useState(0);

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

  const addFile = useCallback((lang: Lang, base: string = "untitled") => {
    setFiles((fs) => {
      const ext = extFor(lang);
      const name = nextName(fs, base, ext);
      const file: ProjectFile = {
        path: `inmem:///${name}`,
        language: lang,
        content: "",
      };
      const next = [...fs, file];
      setCurrent(next.length - 1);
      return next;
    });
  }, []);

  return {
    files,
    current,
    active: files[current],
    setCurrent,
    addFileChoices,
    updateContent,
    addFile,
  };
}
