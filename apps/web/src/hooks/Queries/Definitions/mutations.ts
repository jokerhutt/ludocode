import { mutationOptions } from "@tanstack/react-query";
import type { LessonCompletionPacket } from "@ludocode/types/Completion/LessonCompletionResponse.ts";
import type { LessonSubmission } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { logout, ludoPost } from "@/hooks/Queries/Fetcher/ludoPost.ts";
import {
  CHANGE_COURSE,
  RESET_COURSE_PROGRESS,
  RUN_CODE,
  SUBMIT_CREATE_PROJECT,
  SUBMIT_DELETE_PROJECT,
  SUBMIT_LESSON,
  SUBMIT_ONBOARDING,
  SUBMIT_RENAME_PROJECT,
  SUBMIT_SAVE_PROJECT,
} from "@/constants/api/pathConstants.ts";
import type { ChangeCourseType } from "@ludocode/types/User/ChangeCourseType.ts";
import type { CourseProgress } from "@ludocode/types/User/CourseProgress.ts";
import type { OnboardingResponse } from "@ludocode/types/Onboarding/OnboardingResponse.ts";
import type { OnboardingSubmission } from "@ludocode/types/Onboarding/OnboardingCourse.ts";
import { type ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { type CreateProjectRequest } from "@ludocode/types/Project/CreateProjectRequest.ts";
import type { ProjectListResponse } from "@ludocode/types/Project/ProjectListResponse.ts";
import type { RunnerResult } from "@ludocode/types/Project/Runner/RunnerResult.ts";
import type { RenameProjectRequest } from "@ludocode/types/Project/RenameProjectRequest.ts";

export interface ChangeCourseVariables {
  newCourseId: string;
}

export const mutations = {
  submitLesson: () => {
    return mutationOptions<LessonCompletionPacket, Error, LessonSubmission>({
      mutationKey: ["submitLesson"],
      mutationFn: (variables) =>
        ludoPost<LessonCompletionPacket, LessonSubmission>(
          SUBMIT_LESSON,
          variables,
          true
        ),
    });
  },

  runCode: () => {
    return mutationOptions<RunnerResult, Error, ProjectSnapshot>({
      mutationKey: ["runCode"],
      mutationFn: (variables) =>
        ludoPost<RunnerResult, ProjectSnapshot>(RUN_CODE, variables, true),
    });
  },

  logOut: () => {
    return mutationOptions<void, Error, void>({
      mutationKey: ["logout"],
      mutationFn: () => logout(),
    });
  },

  createProject: () => {
    return mutationOptions<ProjectListResponse, Error, CreateProjectRequest>({
      mutationKey: ["createProject"],
      mutationFn: (variables) =>
        ludoPost<ProjectListResponse, CreateProjectRequest>(
          SUBMIT_CREATE_PROJECT,
          variables,
          true
        ),
    });
  },

  deleteProject: (pid: string) => {
    return mutationOptions<ProjectListResponse, Error, null>({
      mutationKey: ["deleteProject"],
      mutationFn: (variables) =>
        ludoPost<ProjectListResponse, null>(
          SUBMIT_DELETE_PROJECT(pid),
          variables,
          true
        ),
    });
  },

  reameProject: () => {
    return mutationOptions<ProjectListResponse, Error, RenameProjectRequest>({
      mutationKey: ["deleteProject"],
      mutationFn: (variables) =>
        ludoPost<ProjectListResponse, RenameProjectRequest>(
          SUBMIT_RENAME_PROJECT,
          variables,
          true
        ),
    });
  },

  saveProject: () => {
    return mutationOptions<ProjectSnapshot, Error, ProjectSnapshot>({
      mutationKey: ["saveProject"],
      mutationFn: (variables) =>
        ludoPost<ProjectSnapshot, ProjectSnapshot>(
          SUBMIT_SAVE_PROJECT(),
          variables,
          true
        ),
    });
  },

  submitOnboarding: () => {
    return mutationOptions<OnboardingResponse, Error, OnboardingSubmission>({
      mutationKey: ["submitOnboarding"],
      mutationFn: (variables) =>
        ludoPost<OnboardingResponse, OnboardingSubmission>(
          SUBMIT_ONBOARDING,
          variables,
          true
        ),
    });
  },

  resetCourseProgress: () =>
    mutationOptions<CourseProgress, Error, string>({
      mutationKey: ["resetProgress"],
      mutationFn: (courseId) =>
        ludoPost<CourseProgress, null>(
          RESET_COURSE_PROGRESS(courseId),
          null,
          true
        ),
    }),

  changeCourse: () => {
    return mutationOptions<ChangeCourseType, Error, ChangeCourseVariables>({
      mutationKey: ["changeCourse"],
      mutationFn: (variables) =>
        ludoPost<ChangeCourseType, ChangeCourseVariables>(
          CHANGE_COURSE,
          variables,
          true
        ),
    });
  },
};
