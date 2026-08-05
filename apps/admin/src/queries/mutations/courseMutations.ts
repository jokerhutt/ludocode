import { mutations } from "@/queries/definitions/mutations";
import { qk } from "@/queries/definitions/qk";
import type { IconName } from "@ludocode/design-system/primitives/custom-icon";
import type { CourseStatus, LudoCourse } from "@ludocode/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ChangeCourseTitleArgs = {
  courseId: string;
};

export type ChangeCourseTitleRequest = {
  title: string;
};

export function useChangeCourseTitle({ courseId }: ChangeCourseTitleArgs) {
  const qc = useQueryClient();
  return useMutation({
    ...mutations.changeCourseTitle(courseId),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}

type ChangeCourseIconArgs = {
  courseId: string;
};

export type ChangeCourseIconRequest = {
  iconName: IconName;
};

export function useChangeCourseIcon({ courseId }: ChangeCourseIconArgs) {
  const qc = useQueryClient();
  return useMutation({
    ...mutations.changeCourseIcon(courseId),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}

type DeleteCourseArgs = {
  courseId: string;
};

export function useDeleteCourse({ courseId }: DeleteCourseArgs) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.deleteCourse(courseId),
    onSuccess: async (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}

export type ChangeCourseStatusRequest = {
  value: CourseStatus;
};

type ChangeCourseStatusArgs = {
  courseId: string;
};

export function useChangeCourseStatus({ courseId }: ChangeCourseStatusArgs) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.changeCourseStatus(courseId),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}

type ChangeLanguageArgs = {
  courseId: string;
};

export function useChangeLanguage({ courseId }: ChangeLanguageArgs) {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.changeCourseLanguage(courseId),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}

export function useCreateCourse() {
  const qc = useQueryClient();

  return useMutation({
    ...mutations.createCourse(),
    onSuccess: (payload: LudoCourse[]) => {
      qc.setQueryData(qk.courses(), payload);
    },
  });
}
