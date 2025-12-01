import { create, windowScheduler } from "@yornaath/batshit";
import {
  GET_COURSE_PROGRESS_FROM_IDS,
  GET_LESSONS_FROM_IDS,
  GET_MODULES_FROM_IDS,
  GET_USER_COINS_FROM_USER_IDS,
  GET_USERS_FROM_IDS,
} from "../../../constants/api/pathConstants.ts";
import type { LudoLesson } from "@/types/Catalog/LudoLesson";
import { makeIdBatcher } from "./batcherFactory";
import type { LudoModule } from "@/types/Catalog/LudoModule";
import type { LudoUser } from "@/types/User/LudoUser";
import type { CourseProgress } from "@/types/User/CourseProgress.ts";
import type { UserCoins } from "@/types/User/UserCoins.ts";

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

export const userCoinsBatcher = makeIdBatcher<UserCoins>({
  name: "userCoins",
  getUrlFn: GET_USER_COINS_FROM_USER_IDS,
  idsKey: "userIds",
  scheduler: windowScheduler(10),
  createFn: create,
});
