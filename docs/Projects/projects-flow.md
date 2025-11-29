<h1 align="center">Code Playground, Projects & Files</h1>

## Overview

This document explains how the code playground, which allows users to write and execute code, works. 

Projects are seperated into 2 core datstructures: The `ProjectSnapshot` and the `ProjectFileSnapshot`. Each project and file has a `LanguageType`, which assists in deciding the runtime in which the users code runs.

```ts
export type LanguageType = "python" | "javascript" | "lua";

export type ProjectSnapshot = {
  projectId: string;
  projectName: string;
  projectLanguage: LanguageType;
  files: ProjectFileSnapshot[];
};

export type ProjectFileSnapshot = {
  id?: string;
  tempId?: string;
  path: string;
  language: LanguageType;
  content: string;
};
```

## Autosave

The editor has an autosave feature that is handled by the `useAutoSaveProject()` hook. It works with a `useEffect()` listening to a users key inputs, with a small debounce, and sending the `ProjectSnapshot` to the server. The server then computes any diffs and updates the project on the backend. 

For UX reasons, the 'saved' snapshot on the backend does not replace the users current editor buffer, although the user does have a small cloud icon that notifies whether an autosave is currently complete, in progress, or failed.

## The Editor 

As most applications, Ludocode uses Microsoft's Monaco Editor. All setup related to the theme or editor options can be found & modified in the `useMonacoTheme()` hook.

## Running Code & The Output Log

The code runner is handled by the `useRunner()` hook which sends the execution request and stores/formats the output in one output log. The `ProjectRunner.tsx` component then displays the outputs as a list (if the output exists).

The hook takes a `ProjectSnapshot` (the users current project) and an array of `ProjectFileSnapshot` (the projects files) and sends them as-is to the backend.

## File Operations

### Adding Files

When a user adds a file, it will name the file `script + {file extension}` e.g. `script.py`. If `script.py` exists, it will instead name it `script-1.py`, and if that also exists then `script-2.py`

### Editing Files

**Renaming a file:** If a user tries to change a file called `script.py` into `script.txt`, it will automatically be turned into `script.txt.py`



