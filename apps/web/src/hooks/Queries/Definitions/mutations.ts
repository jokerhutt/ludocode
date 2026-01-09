import { mutationOptions } from "@tanstack/react-query";
import type { LessonCompletionPacket } from "@ludocode/types/Completion/LessonCompletionResponse.ts";
import type { LessonSubmission } from "@ludocode/types/Exercise/LessonSubmissions.ts";
import { logout, ludoPost } from "@/hooks/Queries/Fetcher/ludoPost.ts";
import {
  DELETE_USER,
  PROGRESS_COURSES_CURRENT,
  PROJECTS_BASE,
  PROJECTS_BY_ID,
  PROJECTS_NAME,
  RESET_COURSE_PROGRESS,
  RUN_CODE,
  SUBMIT_LESSON,
  SUBMIT_ONBOARDING,
  USERS_ME,
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
import { ludoPut } from "../Fetcher/ludoPut";
import { ludoDelete } from "../Fetcher/ludoDelete";
import { ludoPatch } from "../Fetcher/ludoPatch";

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

  deleteAccount: () => {
    return mutationOptions<void, Error, void>({
      mutationKey: ["deleteUser"],
      mutationFn: () => ludoDelete<void>(USERS_ME, true),
    });
  },

  createProject: () => {
    return mutationOptions<ProjectListResponse, Error, CreateProjectRequest>({
      mutationKey: ["createProject"],
      mutationFn: (variables) =>
        ludoPost<ProjectListResponse, CreateProjectRequest>(
          PROJECTS_BASE,
          variables,
          true
        ),
    });
  },

  deleteProject: (pid: string) => {
    return mutationOptions<ProjectListResponse, Error, void>({
      mutationKey: ["deleteProject"],
      mutationFn: () =>
        ludoDelete<ProjectListResponse>(PROJECTS_BY_ID(pid), true),
    });
  },

  reameProject: () => {
    return mutationOptions<ProjectListResponse, Error, RenameProjectRequest>({
      mutationKey: ["renameProject"],
      mutationFn: (variables) =>
        ludoPatch<ProjectListResponse, RenameProjectRequest>(
          PROJECTS_NAME(variables.targetId),
          variables,
          true
        ),
    });
  },

  saveProject: () => {
    return mutationOptions<ProjectSnapshot, Error, ProjectSnapshot>({
      mutationKey: ["saveProject"],
      mutationFn: (variables) =>
        ludoPut<ProjectSnapshot, ProjectSnapshot>(
          PROJECTS_BY_ID(variables.projectId),
          variables,
          true
        ),
    });
  },

  submitOnboarding: () => {
    return mutationOptions<OnboardingResponse, Error, OnboardingSubmission>({
      mutationKey: ["submitOnboarding"],
      mutationFn: (variables) =>
        ludoPut<OnboardingResponse, OnboardingSubmission>(
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
        ludoPut<ChangeCourseType, ChangeCourseVariables>(
          PROGRESS_COURSES_CURRENT,
          variables,
          true
        ),
    });
  },
};
