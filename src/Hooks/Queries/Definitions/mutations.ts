import { mutationOptions } from "@tanstack/react-query";
import type { LessonCompletionPacket } from "../../../Types/Exercise/LessonCompletionResponse";
import type { LessonSubmission } from "../../../Types/Exercise/LessonSubmissionTypes";
import { ludoPost } from "../Fetcher/ludoPost";
import {
  CHANGE_COURSE,
  RESET_COURSE_PROGRESS,
  SUBMIT_CREATE_PROJECT,
  SUBMIT_LESSON,
  SUBMIT_ONBOARDING,
  SUBMIT_SAVE_PROJECT,
} from "../../../constants/pathConstants";
import type { ChangeCourseType } from "../../../Types/Request/ChangeCourseType";
import type { CourseProgress } from "../../../Types/Progress/CourseProgress";
import type { OnboardingResponse } from "@/Types/Onboarding/OnboardingResponse";
import type { OnboardingSubmission } from "@/Types/Onboarding/OnboardingCourse";
import { type ProjectSnapshot } from "@/Types/Playground/ProjectSnapshot";
import { type CreateProjectRequest } from "@/Types/Playground/CreateProjectRequest";
import type { ProjectListResponse } from "@/Types/Playground/ProjectListResponse";
import type { SaveProjectPayload } from "@/Types/Playground/SaveProjectPayload";

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

  saveProject: (projectId: string) => {
    return mutationOptions<ProjectSnapshot, Error, ProjectSnapshot>({
      mutationKey: ["saveProject"],
      mutationFn: (variables) =>
        ludoPost<ProjectSnapshot, ProjectSnapshot>(
          SUBMIT_SAVE_PROJECT(projectId),
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
