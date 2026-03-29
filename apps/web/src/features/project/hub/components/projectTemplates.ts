import type { CreateProjectRequest } from "@ludocode/types";
import { Languages } from "@ludocode/types/Project/ProjectFileSnapshot.ts";

export type ProjectTemplate = Omit<CreateProjectRequest, "requestHash">;

export const ProjectTemplates = {
  javascript: {
    projectName: "Untitled project",
    projectType: "CODE",
    entryFilePath: "script.js",
    files: [
      {
        path: "script.js",
        language: "javascript",
        content: Languages.javascript.initialScript,
      },
    ],
  },

  python: {
    projectName: "Untitled project",
    projectType: "CODE",
    entryFilePath: "main.py",
    files: [
      {
        path: "main.py",
        language: "python",
        content: Languages.python.initialScript,
      },
    ],
  },

  lua: {
    projectName: "Untitled project",
    projectType: "CODE",
    entryFilePath: "main.lua",
    files: [
      {
        path: "main.lua",
        language: "lua",
        content: Languages.lua.initialScript,
      },
    ],
  },

  web: {
    projectName: "Untitled project",
    projectType: "WEB",
    entryFilePath: "index.html",
    files: [
      {
        path: "index.html",
        language: "html",
        content: Languages.html.initialScript,
      },
      {
        path: "style.css",
        language: "css",
        content: Languages.css.initialScript,
      },
      {
        path: "script.js",
        language: "javascript",
        content: Languages.javascript.initialScript,
      },
    ],
  },
} as const satisfies Record<string, ProjectTemplate>;
