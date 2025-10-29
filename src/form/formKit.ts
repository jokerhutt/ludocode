// src/form/formKit.ts
import {
  createFormHook,
  createFormHookContexts,
  formOptions,
} from "@tanstack/react-form";
import type { ModuleSnapshot } from "../Types/Snapshot/SnapshotTypes";
import TitleField from "../features/Builder/Fields/TitleField";
import { AddExerciseFieldButton } from "../features/Builder/Fields/AddExerciseFieldButton";

export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TitleField,
    AddExerciseFieldButton
  },
  formComponents: {},
});

export const courseFormOpts = formOptions({
  defaultValues: { courseId: "", modules: [] as ModuleSnapshot[] },
});
