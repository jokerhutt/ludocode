export type LanguageMetadata = {
  languageId: number;
  name: string;
  slug: string;
  editorId: string;
  pistonId: string;
  runtimeVersion: string;
  extension: string;
  base: string;
  iconName: string;
  initialScript: string;
  enabled: boolean;
  disabledReason?: string;
};

