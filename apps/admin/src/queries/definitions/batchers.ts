import { makeIdBatcher } from "@ludocode/api/batcherFactory.ts";
import { create, windowScheduler } from "@yornaath/batshit";
import type { LudoUser } from "@ludocode/types";
import { adminApi } from "@/constants/api/adminApi.ts";

export const userBatcher = makeIdBatcher<LudoUser>({
  name: "user",
  getUrlFn: adminApi.users.byIds,
  idsKey: "userIds",
  scheduler: windowScheduler(10),
  createFn: create,
});
