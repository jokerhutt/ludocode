import type { ProjectFile } from "./useProject";

export type Lang = "python" | "html" | "css" | "javascript";

export function extFor(lang: Lang) {
  return lang === "python"
    ? ".py"
    : lang === "html"
    ? ".html"
    : lang === "css"
    ? ".css"
    : ".js";
}

export const stripFileName = (fileName: string) => fileName.replace("inmem:///", "");

export function nextName(files: ProjectFile[], base: string, ext: string) {
  const has = (n: string) => files.some((f) => f.path.endsWith("/" + n));
  if (!has(base + ext)) return base + ext;
  let i = 1;
  while (has(`${base}${i}${ext}`)) i++;
  return `${base}${i}${ext}`;
}
