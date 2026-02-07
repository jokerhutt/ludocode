export type CreateLanguageRequest = {
  name: string;
  slug: string;
  editorId: string;
  pistonId: string;
  extension: string;
  base: string;
  iconName: string;
  initialScript: string;
};

export type UpdateLanguageRequest = {
  name: string;
  slug: string;
  editorId: string;
  pistonId: string;
  extension: string;
  base: string;
  iconName: string;
  initialScript: string;
};
