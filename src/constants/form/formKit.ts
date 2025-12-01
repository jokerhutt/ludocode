// src/form/formKit.ts
import {
  createFormHook,
  createFormHookContexts,
  formOptions,
} from "@tanstack/react-form";
import { CourseSnapSchema } from "@/Types/Zod/SnapshotSchema/CourseSnapSchema";
import type { ModuleSnap } from "@/Types/Snapshot/SnapshotTypes";
import { OnboardingSnapSchema } from "@/Types/Zod/OnboardingSchema/OnboardingSnapSchema";
import FormTitleField from "@/Hooks/form/Fields/FormTitleField";
import { AddExerciseFieldButton } from "@/Hooks/form/Fields/AddExerciseFieldButton";
import { StatusButtonField } from "@/components/LudoComponents/Atoms/Status/StatusButtonField";


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
