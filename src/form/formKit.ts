// src/form/formKit.ts
import {
  createFormHook,
  createFormHookContexts,
  formOptions,
} from "@tanstack/react-form";
import TitleField from "../features/Builder/Fields/TitleField";
import { AddExerciseFieldButton } from "../features/Builder/Fields/AddExerciseFieldButton";
import { CourseSnapSchema } from "@/Types/Zod/CourseSnapSchema";
import type { ModuleSnap } from "@/Types/Snapshot/SnapshotTypes";

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

export const courseFormOpts = {
  defaultValues: { courseId: "" as string, modules: [] as ModuleSnap[]},
  validators: {
    onSubmit: CourseSnapSchema, // full validation on submit
    // or onChange: CourseSnapSchema for live validation
  },
};
