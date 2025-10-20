export const API_URL = "http://localhost:8080";

export const TEST_USER_ID = "883afb8e-6a78-4d1c-a098-9ed81d406cdc"

export const API_PREFIX = "/api";

export const API_PATH = API_URL + API_PREFIX;

export const GET_COURSE_TREE = (courseId: string) => {
  return API_PATH + `/catalog/courses/${courseId}/tree`;
};

export const GET_LESSONS_FROM_IDS = (lessonIds: string) =>
  API_PATH + `/catalog/lessons/ids?${lessonIds}`;

export const GET_MODULES_FROM_IDS = (moduleIds: string) =>
  API_PATH + `/catalog/modules/ids?${moduleIds}`;

export const GET_MODULES_BY_COURSE = (courseId: string) => 
    API_PATH + `/catalog/modules/${courseId}`

export const GET_LESSONS_BY_MODULE = (moduleId: string) =>
    API_PATH + `/catalog/lessons/all/${moduleId}`



export const GOOGLE_LOGIN = API_PATH + `/google-login`