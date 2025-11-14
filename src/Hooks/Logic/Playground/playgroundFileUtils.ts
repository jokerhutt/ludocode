import type { LanguageType } from "@/Types/Playground/LanguageType";
import type { ProjectFile } from "./useProject";

export function extFor(lang: LanguageType) {
  return lang === "python" ? ".py" : ".html";
}

export const stripFileName = (fileName: string) =>
  fileName.replace("inmem:///", "");

function fileName(p: string) {
  return p.split("/").pop()!;
}


export function normalizeFileName(raw: string, lang: LanguageType): string {
  const ext = extFor(lang);
  let name = raw.trim();

  if (!name) {
    return `untitled${ext}`;
  }

  if (!name.endsWith(ext)) {
    name += ext;
  }

  return name;
}

export function nextName(files: ProjectFile[], base: string, ext: string) {
  const has = (n: string) => files.some((f) => fileName(f.path) === n);

  const first = `${base}${ext}`;
  if (!has(first)) return first;

  let i = 1;
  while (has(`${base}-${i}${ext}`)) i++;

  return `${base}-${i}${ext}`;
}
