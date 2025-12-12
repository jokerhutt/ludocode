import { API_URL, DEMO_AUTH_TOKEN } from "../environment/env";

export const API_PREFIX = "/api/v1";
export const API_PATH = API_URL + API_PREFIX;

// == COURSES == //
export const GET_ALL_COURSES = API_PATH + `/catalog/courses`;
export const GET_COURSE_TREE = (courseId: string) =>
  API_PATH + `/catalog/courses/${courseId}/tree`;

export const LOGOUT = API_PATH + `/auth/logout`;

export const GET_ENABLED_FEATURES = API_PATH + `/features`;

// == MODULES == //
export const GET_MODULES_FROM_IDS = (moduleIds: string) =>
  API_PATH + `/catalog/modules/ids?${moduleIds}`;

// == LESSONS == //
export const GET_LESSONS_FROM_IDS = (lessonIds: string) =>
  API_PATH + `/catalog/lessons/ids?${lessonIds}`;
export const GET_EXERCISES_FROM_LESSON = (lessonId: string) =>
  API_PATH + `/catalog/lessons/${lessonId}/exercises`;

// == SNAPSHOT == //
export const SUBMIT_COURSE_SNAPSHOT = API_PATH + `/snapshot/submit`;
export const SUBMIT_CREATE_COURSE = API_PATH + `/snapshot/course/create`;
export const GET_COURSE_SNAPSHOT = (courseId: string) =>
  API_PATH + `/snapshot/course/${courseId}`;

// == AI == //
export const SUBMIT_AI_PROMPT = API_PATH + `/ai/prompt/send`;

// == PROJECT == //
export const GET_PROJECT = (pid: string) => API_PATH + `/projects/${pid}/get`;
export const GET_MY_PROJECTS = API_PATH + `/projects/my`;
export const SUBMIT_RENAME_PROJECT = API_PATH + `/projects/rename`;
export const SUBMIT_CREATE_PROJECT = API_PATH + `/projects/create`;
export const SUBMIT_SAVE_PROJECT = () => API_PATH + `/projects/save`;
export const SUBMIT_DELETE_PROJECT = (pid: string) =>
  API_PATH + `/projects/${pid}/delete`;

// == RUNNER == //
export const RUN_CODE = API_PATH + `/runner/run`;

// == AUTH == //
export const AUTH_ME = API_PATH + `/auth/me`;
export const GOOGLE_LOGIN = API_PATH + `/auth/login/google`;
export const DEMO_LOGIN =
  API_PATH + `/auth/login/demo?token=${DEMO_AUTH_TOKEN}`;

// == USER == //
export const GET_USERS_FROM_IDS = (userIds: string) =>
  API_PATH + `/users/ids?${userIds}`;
export const GET_USER_PREFERENCES = API_PATH + `/users/preferences`;
export const SUBMIT_ONBOARDING = API_PATH + `/users/onboarding/submit`;
export const CHANGE_COURSE = API_PATH + `/progress/course/course/change`;

// == PROGRESS - COURSE == //
export const GET_CURRENT_COURSE_ID = API_PATH + `/progress/course/current`;
export const GET_ENROLLED_IDS = API_PATH + `/progress/course/enrolled`;
export const GET_COURSE_PROGRESS_FROM_IDS = (courseIds: string) =>
  API_PATH + `/progress/course/ids?${courseIds}`;
export const RESET_COURSE_PROGRESS = (courseId: string) =>
  API_PATH + `/progress/course/${courseId}/reset`;

// == PROGRESS - STREAK == //
export const GET_USER_STREAK = API_PATH + `/progress/streak/get`;
export const GET_PAST_WEEK_STREAK = API_PATH + `/progress/streak/get/week`;

// == PROGRESS - COINS == //
export const GET_USER_COINS_FROM_USER_IDS = (userIds: string) =>
  API_PATH + `/progress/coins/ids?${userIds}`;

// == PROGRESS - COMPLETION == //
export const SUBMIT_LESSON = API_PATH + `/progress/completion/submit`;
