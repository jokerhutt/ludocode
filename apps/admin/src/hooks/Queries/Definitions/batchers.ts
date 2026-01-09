import { makeIdBatcher } from "@ludocode/api/batcherFactory";
import { create, windowScheduler } from "@yornaath/batshit";
import type { LudoUser } from "@ludocode/types";
import { adminApi } from "@/constants/api/adminApi";

export const userBatcher = makeIdBatcher<LudoUser>({
  name: "user",
  getUrlFn: adminApi.users.byIds,
  idsKey: "userIds",
  scheduler: windowScheduler(10),
  createFn: create,
});
