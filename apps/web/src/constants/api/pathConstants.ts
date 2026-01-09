import { API_URL, DEMO_AUTH_TOKEN } from "@/constants/environment/env";

export const API_PREFIX = "/api/v1";
export const API_PATH = API_URL + API_PREFIX;

// == COURSES == //
export const COURSES = API_PATH + `/catalog/courses`;
export const GET_COURSE_TREE = (courseId: string) =>
  API_PATH + `/catalog/courses/${courseId}/tree`;

// == AUTH == //
export const AUTH_ME = API_PATH + `/auth/me`;
export const DEMO_LOGIN = API_PATH + `/auth/demo?token=${DEMO_AUTH_TOKEN}`;
export const LOGOUT = API_PATH + `/auth/logout`;
export const FIREBASE_AUTH = API_PATH + `/auth/firebase`;

export const GET_ENABLED_FEATURES = API_PATH + `/features`;

// == MODULES == //
export const GET_MODULES_FROM_IDS = (moduleIds: string) =>
  API_PATH + `/catalog/modules?${moduleIds}`;

// == LESSONS == //
export const GET_LESSONS_FROM_IDS = (lessonIds: string) =>
  API_PATH + `/catalog/lessons?${lessonIds}`;
export const GET_EXERCISES_FROM_LESSON = (lessonId: string) =>
  API_PATH + `/catalog/lessons/${lessonId}/exercises`;

// == AI == //
export const SUBMIT_AI_PROMPT = API_PATH + `/ai/completions`;

// == AI CREDITS == //
export const GET_USER_CREDITS = API_PATH + `/credits`;

// == PROJECT == //
export const PROJECTS_BASE = API_PATH + `/projects`;
export const PROJECTS_BY_ID = (projectId: string) =>
  API_PATH + `/projects/${projectId}`;
export const PROJECTS_NAME = (projectId: string) => API_PATH + `/projects/${projectId}/name`
export const SUBMIT_CREATE_PROJECT = API_PATH + `/projects/create`;

// == RUNNER == //
export const RUN_CODE = API_PATH + `/runner/executions`;

// == USER == //
export const GET_USERS_FROM_IDS = (userIds: string) =>
  API_PATH + `/users?${userIds}`;
export const GET_USER_PREFERENCES = API_PATH + `/users/me/preferences`;
export const SUBMIT_ONBOARDING = API_PATH + `/users/me/onboarding`;
export const USERS_ME = API_PATH + `/users/me`;
export const DELETE_USER = API_PATH + `/users/delete`;

// == PROGRESS - COURSE == //
export const PROGRESS_COURSES_CURRENT = API_PATH + `/progress/courses/current`;
export const GET_ENROLLED_IDS = API_PATH + `/progress/courses/enrolled`;
export const GET_COURSE_PROGRESS_FROM_IDS = (courseIds: string) =>
  API_PATH + `/progress/courses?${courseIds}`;
export const RESET_COURSE_PROGRESS = (courseId: string) =>
  API_PATH + `/progress/courses/${courseId}/reset`;

// == PROGRESS - STREAK == //
export const STREAK_BASE = API_PATH + `/progress/streak`;
export function streakPath(mode?: "weekly") {
  if (!mode) return STREAK_BASE;
  return `${STREAK_BASE}?mode=${mode}`;
}

// == PROGRESS - COINS == //
export const GET_USER_COINS_FROM_USER_IDS = (userIds: string) =>
  API_PATH + `/progress/coins?${userIds}`;

// == PROGRESS - COMPLETION == //
export const SUBMIT_LESSON = API_PATH + `/progress/completion`;
