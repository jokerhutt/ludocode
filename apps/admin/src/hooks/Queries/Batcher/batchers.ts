import { GET_USERS_FROM_IDS } from "@/constants/api/pathConstants";
import { makeIdBatcher } from "./batcherFactory";
import { create, windowScheduler } from "@yornaath/batshit";
import type { LudoUser } from "@ludocode/types";

export const userBatcher = makeIdBatcher<LudoUser>({
  name: "user",
  getUrlFn: GET_USERS_FROM_IDS,
  idsKey: "userIds",
  scheduler: windowScheduler(10),
  createFn: create,
});
