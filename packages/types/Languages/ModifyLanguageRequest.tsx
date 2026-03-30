export type ModifyLanguageRequest = {
  name: string;
  slug: string;
  runtime: "PISTON" | "BROWSER";
  editorId: string;
  pistonId: string;
  runtimeVersion: string;
  extension: string;
  base: string;
  iconName: string;
  initialScript: string;
};
