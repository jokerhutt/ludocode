// src/form/formKit.ts
import {
  createFormHook,
  createFormHookContexts,
  formOptions,
} from "@tanstack/react-form";
import type { ModuleSnapshot } from "../Types/Snapshot/SnapshotTypes";
import TitleField from "../features/Builder/FormComponents/TitleField";

export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TitleField,
  },
  formComponents: {},
});

export const courseFormOpts = formOptions({
  defaultValues: { courseId: "", modules: [] as ModuleSnapshot[] },
});
