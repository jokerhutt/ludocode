import { API_URL } from "@/constants/environment/env.ts";

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
export const SUBMIT_CREATE_COURSE = API_PATH + `/snapshots/course/create`;

export const SNAPSHOT = API_PATH + `/snapshots`
export const SNAPSHOT_COURSE = API_PATH + `/course`
export const SNAPSHOT_BY_COURSE = (courseId: string) =>
  API_PATH + `/snapshots/${courseId}`;

// == COURSES == //
export const COURSES = API_PATH + `/catalog/courses`;
