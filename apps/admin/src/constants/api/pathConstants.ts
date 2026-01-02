import { API_URL } from "../environment/env.ts";

// == PREFIX == //
export const API_PREFIX = "/api/v1";
export const API_PATH = API_URL + API_PREFIX;

// == USERS == //
export const GET_USERS_FROM_IDS = (userIds: string) =>
  API_PATH + `/users/ids?${userIds}`;

// == AUTH == //
export const AUTH_ME = API_PATH + `/auth/me`;
export const GOOGLE_LOGIN = API_PATH + `/auth/login/google`;

// == SNAPSHOT == //
export const SUBMIT_COURSE_SNAPSHOT = API_PATH + `/snapshot/submit`;
export const SUBMIT_CREATE_COURSE = API_PATH + `/snapshot/course/create`;
export const GET_COURSE_SNAPSHOT = (courseId: string) =>
  API_PATH + `/snapshot/course/${courseId}`;
