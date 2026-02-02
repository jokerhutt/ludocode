import { mutationOptions } from "@tanstack/react-query";
import type { LessonCompletionPacket } from "@ludocode/types/Completion/LessonCompletionResponse.ts";
import type { LessonSubmission } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import type { ChangeCourseType } from "@ludocode/types/User/ChangeCourseType.ts";
import type { CourseProgress } from "@ludocode/types/User/CourseProgress.ts";
import type { OnboardingResponse } from "@ludocode/types/Onboarding/OnboardingResponse.ts";
import type { OnboardingSubmission } from "@ludocode/types/Onboarding/OnboardingCourse.ts";
import { type ProjectSnapshot } from "@ludocode/types/Project/ProjectSnapshot.ts";
import { type CreateProjectRequest } from "@ludocode/types/Project/CreateProjectRequest.ts";
import type { ProjectListResponse } from "@ludocode/types/Project/ProjectListResponse.ts";
import type { RunnerResult } from "@ludocode/types/Project/Runner/RunnerResult.ts";
import type { RenameProjectRequest } from "@ludocode/types/Project/RenameProjectRequest.ts";
import {
  ludoPut,
  ludoPatch,
  ludoPost,
  ludoDelete,
} from "@ludocode/api/fetcher";
import { api } from "@/constants/api/api";
import { logout } from "@/constants/api/logout";
import type {
  TogglePreferencesRequest,
  UserPreferences,
  EditProfileRequest,
  LudoUser,
} from "@ludocode/types";

export interface ChangeCourseVariables {
  newCourseId: string;
}

export const mutations = {
  submitLesson: () => {
    return mutationOptions<LessonCompletionPacket, Error, LessonSubmission>({
      mutationKey: ["submitLesson"],
      mutationFn: (variables) =>
        ludoPost<LessonCompletionPacket, LessonSubmission>(
          api.progress.completion.base,
          variables,
          true,
        ),
    });
  },

  runCode: () => {
    return mutationOptions<RunnerResult, Error, ProjectSnapshot>({
      mutationKey: ["runCode"],
      mutationFn: (variables) =>
        ludoPost<RunnerResult, ProjectSnapshot>(
          api.runner.execute,
          variables,
          true,
        ),
    });
  },

  logOut: () => {
    return mutationOptions<void, Error, void>({
      mutationKey: ["logout"],
      mutationFn: () => logout(),
    });
  },

  deleteAccount: () => {
    return mutationOptions<void, Error, void>({
      mutationKey: ["deleteUser"],
      mutationFn: () => ludoDelete<void>(api.users.me, true),
    });
  },

  createProject: () => {
    return mutationOptions<ProjectListResponse, Error, CreateProjectRequest>({
      mutationKey: ["createProject"],
      mutationFn: (variables) =>
        ludoPost<ProjectListResponse, CreateProjectRequest>(
          api.projects.base,
          variables,
          true,
        ),
    });
  },

  deleteProject: (pid: string) => {
    return mutationOptions<ProjectListResponse, Error, void>({
      mutationKey: ["deleteProject"],
      mutationFn: () =>
        ludoDelete<ProjectListResponse>(api.projects.byId(pid), true),
    });
  },

  reameProject: () => {
    return mutationOptions<ProjectListResponse, Error, RenameProjectRequest>({
      mutationKey: ["renameProject"],
      mutationFn: (variables) =>
        ludoPatch<ProjectListResponse, RenameProjectRequest>(
          api.projects.name(variables.targetId),
          variables,
          true,
        ),
    });
  },

  saveProject: () => {
    return mutationOptions<ProjectSnapshot, Error, ProjectSnapshot>({
      mutationKey: ["saveProject"],
      mutationFn: (variables) =>
        ludoPut<ProjectSnapshot, ProjectSnapshot>(
          api.projects.byId(variables.projectId),
          variables,
          true,
        ),
    });
  },

  submitOnboarding: () => {
    return mutationOptions<OnboardingResponse, Error, OnboardingSubmission>({
      mutationKey: ["submitOnboarding"],
      mutationFn: (variables) =>
        ludoPut<OnboardingResponse, OnboardingSubmission>(
          api.preferences.base,
          variables,
          true,
        ),
    });
  },

  editPreferences: () => {
    return mutationOptions<UserPreferences, Error, TogglePreferencesRequest>({
      mutationKey: ["editPreferences"],
      mutationFn: (variables) =>
        ludoPatch<UserPreferences, TogglePreferencesRequest>(
          api.preferences.base,
          variables,
          true,
        ),
    });
  },

  editProfile: () => {
    mutationOptions<LudoUser, Error, EditProfileRequest>({
      mutationKey: ["editProfile"],
      mutationFn: (variables) =>
        ludoPut<LudoUser, EditProfileRequest>(api.users.me, variables, true),
    });
  },

  resetCourseProgress: () =>
    mutationOptions<CourseProgress, Error, string>({
      mutationKey: ["resetProgress"],
      mutationFn: (courseId) =>
        ludoPost<CourseProgress, null>(
          api.progress.courses.reset(courseId),
          null,
          true,
        ),
    }),

  changeCourse: () => {
    return mutationOptions<ChangeCourseType, Error, ChangeCourseVariables>({
      mutationKey: ["changeCourse"],
      mutationFn: (variables) =>
        ludoPut<ChangeCourseType, ChangeCourseVariables>(
          api.progress.courses.current,
          variables,
          true,
        ),
    });
  },
};
