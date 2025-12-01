import { mutationOptions } from "@tanstack/react-query";
import type { LessonCompletionPacket } from "../../../Types/Exercise/LessonCompletionResponse";
import type { LessonSubmission } from "../../../Types/Exercise/LessonSubmissionTypes";
import { ludoPost } from "../Fetcher/ludoPost";
import {
  CHANGE_COURSE,
  RESET_COURSE_PROGRESS,
  RUN_CODE,
  SUBMIT_CREATE_COURSE,
  SUBMIT_CREATE_PROJECT,
  SUBMIT_DELETE_PROJECT,
  SUBMIT_LESSON,
  SUBMIT_ONBOARDING,
  SUBMIT_RENAME_PROJECT,
  SUBMIT_SAVE_PROJECT,
} from "../../../constants/api/pathConstants";
import type { ChangeCourseType } from "../../../Types/Request/ChangeCourseType";
import type { CourseProgress } from "../../../Types/Progress/CourseProgress";
import type { OnboardingResponse } from "@/Types/Onboarding/OnboardingResponse";
import type { OnboardingSubmission } from "@/Types/Onboarding/OnboardingCourse";
import { type ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import { type CreateProjectRequest } from "@/Types/Playground/CreateProjectRequest";
import type { ProjectListResponse } from "@/Types/Playground/ProjectListResponse";
import type { RunnerResult } from "@/Types/Playground/RunnerResult";
import type { RenameProjectRequest } from "@/Types/Playground/RenameProjectRequest";
import { type LudoCourse } from "@/Types/Catalog/LudoCourse";
import { type CreateCourseRequest } from "@/Types/Request/CreateCourseRequest";

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

  createCourse: () => {
    return mutationOptions<LudoCourse[], Error, CreateCourseRequest>({
      mutationKey: ["createCourse"],
      mutationFn: (variables) =>
        ludoPost<LudoCourse[], CreateCourseRequest>(
          SUBMIT_CREATE_COURSE,
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
