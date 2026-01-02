// src/Form/formKit.ts
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import FormTitleField from "@/features/Builder/Components/fields/form-title-field.tsx";
import { AddExerciseFieldButton } from "@/features/Builder/Components/fields/add-exercise-field-button.tsx";
import { StatusDot } from "../../../../../packages/design-system/primitives/status-dot.tsx";
import { CourseSnapSchema, OnboardingSnapSchema, type ModuleSnap } from "@ludocode/types";

export const { fieldContext, formContext, useFormContext, useFieldContext } =
  createFormHookContexts();
export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormTitleField,
    StatusButtonField: StatusDot,
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
