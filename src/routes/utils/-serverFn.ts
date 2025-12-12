import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "./session";
import { getRequestHeaders } from "@tanstack/react-start/server";
import {
  AUTH_ME,
  GET_ALL_COURSES,
  GET_COURSE_PROGRESS_FROM_IDS,
  GET_COURSE_SNAPSHOT,
  GET_COURSE_TREE,
  GET_CURRENT_COURSE_ID,
  GET_ENROLLED_IDS,
  GET_EXERCISES_FROM_LESSON,
  GET_MY_PROJECTS,
  GET_PAST_WEEK_STREAK,
  GET_USER_COINS_FROM_USER_IDS,
  GET_USER_STREAK,
} from "@/constants/api/pathConstants";
import type { UserCoins } from "@/types/User/UserCoins";
import type { DailyGoalMet, UserStreak } from "@/types/User/UserStreak";
import type { CourseSnap } from "@/types/Builder/BuilderSnapshotTypes";
import type { FlatCourseTree } from "@/types/Catalog/FlatCourseTree";
import type { LudoUser } from "@/types/User/LudoUser";
import type { LudoExercise } from "@/types/Exercise/LudoExercise";
import type { ProjectListResponse } from "@/types/Project/ProjectListResponse";
import { parseIdsToRequestParam } from "@/hooks/Queries/Batcher/batcherFactory";
async function ludoServerGet<T>(
  path: string,
  name = "",
  cookie = ""
): Promise<T> {
  const res = await fetch(path, {
    headers: {
      cookie: cookie,
    },
  });

  if (!res.ok) {
    console.error("FETCH FAILED", path, res.status);
    throw new Error("Failed to fetch " + name);
  }

  return res.json() as Promise<T>;
}

export const getCurrentCourseIdFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<string>(
      GET_CURRENT_COURSE_ID,
      "Current Course Id",
      cookie
    );
  }
);

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();
    if (!session.data.id) {
      throw new Response("Unauthorized", { status: 401 });
    }
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<LudoUser>(AUTH_ME, "Current User", cookie);
  }
);

export const getProjectsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<ProjectListResponse>(
      GET_MY_PROJECTS,
      "Projects",
      cookie
    );
  }
);

export const getExercisesFromLessonFn = createServerFn({ method: "GET" })
  .inputValidator((lessonId: string) => lessonId)
  .handler(async ({ data: lessonId }) => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<LudoExercise[]>(
      GET_EXERCISES_FROM_LESSON(lessonId),
      "Exercises From Lesson",
      cookie
    );
  });

export const getCourseSnapshotFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data: courseId }) => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<CourseSnap>(
      GET_COURSE_SNAPSHOT(courseId),
      "Course Snapshot",
      cookie
    );
  });

export const getCourseTreeFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data: courseId }) => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<FlatCourseTree>(
      GET_COURSE_TREE(courseId),
      "Course Tree",
      cookie
    );
  });

export const getUserWeeklyStreakFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<DailyGoalMet[]>(
      GET_PAST_WEEK_STREAK,
      "Past Week Streak",
      cookie
    );
  }
);

export const getAllCoursesFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<string[]>(
      GET_ALL_COURSES,
      "All Courses",
      cookie
    );
  }
);

export const getUserEnrolledFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<string[]>(
      GET_ENROLLED_IDS,
      "User Enrolled Courses",
      cookie
    );
  }
);

export const getUserStreakFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    return await ludoServerGet<UserStreak>(
      GET_USER_STREAK,
      "User Streak",
      cookie
    );
  }
);

export const getUserCoinsFn = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data: userId }) => {
    const cookie = getRequestHeaders().get("cookie") ?? "";

    const results = await ludoServerGet<UserCoins[]>(
      GET_USER_COINS_FROM_USER_IDS(parseIdsToRequestParam("userIds", [userId])),
      "User Coins",
      cookie
    );

    if (!Array.isArray(results) || results.length === 0) {
      throw new Error("No coins found");
    }

    return results[0];
  });

export const getCourseProgressServer = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data: courseId }) => {
    const cookie = getRequestHeaders().get("cookie") ?? "";
    const results = await ludoServerGet<any[]>(
      GET_COURSE_PROGRESS_FROM_IDS(
        parseIdsToRequestParam("courseIds", [courseId])
      ),
      "Course Progress",
      cookie
    );
    if (!Array.isArray(results) || results.length === 0) {
      throw new Error("No course progress found");
    }

    return results[0];
  });
