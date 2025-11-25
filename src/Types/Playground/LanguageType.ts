import type { IconName } from "@/components/Atoms/Icons/CustomIcon";
import type { ProjectFileChoice } from "@/Hooks/Logic/Playground/useProject";

export type LanguageType = "python" | "javascript" | "lua";

export type LanguageData = {
  title: string;
  iconName: IconName;
  fileExtension: string;
  fileName: string;
  fileTemplate: ProjectFileChoice;
};

export const LANGUAGE_MAP: Record<LanguageType, LanguageData> = {
  python: {
    title: "Python",
    iconName: "Python",
    fileExtension: ".py",
    fileName: "script.py",
    fileTemplate: { name: "Python", lang: "python", base: "script" },
  },

  javascript: {
    title: "JavaScript",
    iconName: "Javascript",
    fileExtension: ".js",
    fileName: "script.js",
    fileTemplate: { name: "Javascript", lang: "javascript", base: "script" },
  },

  lua: {
    title: "Lua",
    iconName: "Lua",
    fileExtension: ".lua",
    fileName: "script.lua",
    fileTemplate: { name: "Lua", lang: "lua", base: "script" },
  },
};
