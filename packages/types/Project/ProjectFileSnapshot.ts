import {type IconName} from "@ludocode/design-system/primitives/custom-icon"

export type ProjectFileSnapshot = {
  tempId?: string;
  path: string;
  language: LanguageKey;
  content: string;
};

type LanguageMetadata = {
  name: string;
  extension: string;
  base: string;
  iconName: IconName;
  initialScript: string;
  webAllowed?: boolean;
};

export type LanguageKey = "javascript" | "python" | "html" | "css" | "lua";

export const Languages: Record<string, LanguageMetadata> = {
  javascript: {
    name: "javascript",
    extension: ".js",
    base: "web",
    iconName: "Javascript",
    initialScript: `console.log("Hello world");`,
    webAllowed: true,
  },
  python: {
    name: "python",
    extension: ".py",
    base: "script",
    iconName: "Python",
    initialScript: `print("Hello world")`,
  },
  html: {
    name: "html",
    extension: ".html",
    base: "web",
    iconName: "HTML",
    initialScript: `<h1>Hello world</h1>`,
    webAllowed: true,
  },
  css: {
    name: "css",
    extension: ".css",
    base: "web",
    iconName: "CSS",
    initialScript: `body { margin: 0; }`,
    webAllowed: true,
  },
  lua: {
    name: "lua",
    extension: ".lua",
    base: "script",
    iconName: "Lua",
    initialScript: `print("Hello world")`,
  },
};
