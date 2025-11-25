import type { ProjectFile } from "./useProject";

export const stripFileName = (fileName: string) =>
  fileName.replace("inmem:///", "");

function fileName(p: string) {
  return p.split("/").pop()!;
}

export function nextName(files: ProjectFile[], base: string, ext: string) {
  const has = (n: string) => files.some((f) => fileName(f.path) === n);

  const first = `${base}${ext}`;
  if (!has(first)) return first;

  let i = 1;
  while (has(`${base}-${i}${ext}`)) i++;

  return `${base}-${i}${ext}`;
}
