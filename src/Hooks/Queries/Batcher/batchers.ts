import { create, windowScheduler } from "@yornaath/batshit";
import {
  GET_COURSE_PROGRESS_FROM_IDS,
  GET_LESSONS_FROM_IDS,
  GET_MODULES_FROM_IDS,
  GET_USER_STATS_FROM_USER_IDS,
  GET_USERS_FROM_IDS,
} from "../../../constants/pathConstants.ts";
import type { LudoLesson } from "../../../Types/Catalog/LudoLesson";
import { makeIdBatcher } from "./batcherFactory";
import type { LudoModule } from "../../../Types/Catalog/LudoModule";
import type { LudoUser } from "../../../Types/User/LudoUser";
import type { CourseProgress } from "../../../Types/Progress/CourseProgress";
import type { LudoStats } from "../../../Types/User/LudoStats.ts";

export const lessonBatcher = makeIdBatcher<LudoLesson>({
  name: "lesson",
  getUrlFn: GET_LESSONS_FROM_IDS,
  idsKey: "lessonIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const moduleBatcher = makeIdBatcher<LudoModule>({
  name: "module",
  getUrlFn: GET_MODULES_FROM_IDS,
  idsKey: "moduleIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const userBatcher = makeIdBatcher<LudoUser>({
  name: "user",
  getUrlFn: GET_USERS_FROM_IDS,
  idsKey: "userIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const courseProgressBatcher = makeIdBatcher<CourseProgress>({
  name: "courseProgress",
  getUrlFn: GET_COURSE_PROGRESS_FROM_IDS,
  idsKey: "courseIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const userStatsBatcher = makeIdBatcher<LudoStats>({
  name: "userStats",
  getUrlFn: GET_USER_STATS_FROM_USER_IDS,
  idsKey: "userIds",
  scheduler: windowScheduler(10),
  createFn: create,
})
