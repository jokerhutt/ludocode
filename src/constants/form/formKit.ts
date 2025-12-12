// src/Form/formKit.ts
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { CourseSnapSchema } from "@/types/Zod/SnapshotSchema/CourseSnapSchema";
import type { ModuleSnap } from "@/types/Builder/BuilderSnapshotTypes.ts";
import { OnboardingSnapSchema } from "@/types/Zod/OnboardingSchema/OnboardingSnapSchema";
import FormTitleField from "@/components/tanstack-form-components/fields/form-title-field.tsx";
import { AddExerciseFieldButton } from "@/components/tanstack-form-components/fields/add-exercise-field-button.tsx";
import { StatusButtonField } from "@/components/design-system/atoms/status/status-button-field.tsx";

export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormTitleField,
    StatusButtonField,
    AddExerciseFieldButton,
  },
  formComponents: {},
});

export const courseFormOpts = {
  defaultValues: { courseId: "" as string, modules: [] as ModuleSnap[] },
  validators: {
    onSubmit: CourseSnapSchema,
  },
};
export const onboardingFormOpts = {
  defaultValues: {},
  validators: {
    onSubmit: OnboardingSnapSchema,
  },
};
