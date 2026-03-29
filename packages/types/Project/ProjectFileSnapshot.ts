import { type IconName } from "@ludocode/design-system/primitives/custom-icon";

export type ProjectFileSnapshot = {
  tempId?: string;
  path: string;
  language: LanguageKey;
  content: string;
};

type LanguageMetadata = {
  languageId: number;
  name: string;
  extension: string;
  base: string;
  iconName: IconName;
  initialScript: string;
  webAllowed?: boolean;
};

export type LanguageKey = "javascript" | "python" | "html" | "css" | "lua";

export const Languages: Record<LanguageKey, LanguageMetadata> = {
  javascript: {
    languageId: 1,
    name: "javascript",
    extension: ".js",
    base: "web",
    iconName: "Javascript",
    initialScript: `console.log("Hello world");`,
    webAllowed: true,
  },
  python: {
    languageId: 2,
    name: "python",
    extension: ".py",
    base: "script",
    iconName: "Python",
    initialScript: `print("Hello world")`,
  },
  html: {
    languageId: 3,
    name: "html",
    extension: ".html",
    base: "web",
    iconName: "HTML",
    initialScript: `<!DOCTYPE html>
<html>
<head>
  <title>Ludocode</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello world</h1>
  <script src="script.js"></script>
</body>
</html>`,
    webAllowed: true,
  },
  css: {
    languageId: 4,
    name: "css",
    extension: ".css",
    base: "web",
    iconName: "CSS",
    initialScript: `body { margin: 0; }`,
    webAllowed: true,
  },
  lua: {
    languageId: 5,
    name: "lua",
    extension: ".lua",
    base: "script",
    iconName: "Lua",
    initialScript: `print("Hello world")`,
  },
};
