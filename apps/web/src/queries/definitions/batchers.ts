import { create, windowScheduler } from "@yornaath/batshit";
import type { LudoLesson } from "@ludocode/types/Catalog/LudoLesson.ts";
import type { LudoModule } from "@ludocode/types/Catalog/LudoModule.ts";
import type { CourseProgress } from "@ludocode/types/User/CourseProgress.ts";
import type { UserCoins } from "@ludocode/types/User/UserCoins.ts";
import { type CourseStats, type LudoUser } from "@ludocode/types";
import { api } from "@/constants/api/api.ts";
import { makeIdBatcher } from "@ludocode/api/batcherFactory.ts";

export const lessonBatcher = makeIdBatcher<LudoLesson>({
  name: "lesson",
  getUrlFn: api.lessons.lessons,
  idsKey: "lessonIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const moduleBatcher = makeIdBatcher<LudoModule>({
  name: "module",
  getUrlFn: api.catalog.modules,
  idsKey: "moduleIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const userBatcher = makeIdBatcher<LudoUser>({
  name: "user",
  getUrlFn: api.users.byIds,
  idsKey: "userIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const courseProgressBatcher = makeIdBatcher<CourseProgress>({
  name: "courseProgress",
  getUrlFn: api.progress.courses.byIds,
  idsKey: "courseIds",
  scheduler: windowScheduler(10),
  createFn: create,
});

export const courseStatsBatcher = makeIdBatcher<CourseStats>({
  name: "courseStats",
  getUrlFn: api.progress.courses.statsByIds,
  idsKey: "courseIds",
  scheduler: windowScheduler(10),
  createFn: create
})

export const userCoinsBatcher = makeIdBatcher<UserCoins>({
  name: "userCoins",
  getUrlFn: api.progress.coins.byUserIds,
  idsKey: "userIds",
  scheduler: windowScheduler(10),
  createFn: create,
});
