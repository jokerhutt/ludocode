<h1 align="center">Queries & State Management</h1>

## Overview

This document explains how TanStack Query is used for server-side data caching and retrieval.

Each piece of server data—such as user stats, lessons, courses, or progress—is stored under a query key. Query keys identify the data, and once fetched, the result is cached until invalidated. Components request data through these keys rather than holding it themselves.

A basic example for fetching and caching a user’s streak looks like this:

```ts
const qk = {
  streak: (userId: string) => ["streak", userId] as const
}

const qo = {
  streak: (userId: string) =>
    queryOptions<UserStreak>({
      queryKey: qk.streak(userId),
      queryFn: () => ludoGet<UserStreak>(GET_USER_STREAK, true),
      staleTime: 60_000,
    })
}
```

`qk` holds the query key definitions. `qo` binds these keys to options describing how the data is fetched.

To access the streak in a component:

```ts
const { data: streak } = useSuspenseQuery(qo.streak(currentUserId));
```

`useSuspenseQuery` blocks rendering until the requested data is available, so the component does not need to handle loading states or undefined values.

---

## Batching Queries

A course can contain many lessons. If each lesson has its own fetch, loading 10 lessons would normally trigger 10 separate requests. To avoid this scenario, a batcher is used.

When multiple queries request lessons, the batcher collects the missing lesson ids and sends them to the backend in one combined request. Lessons already cached are resolved immediately, and only the missing ones are fetched.

For example, if the cache contains lessons [1, 2, 5], and the module has lessons [1, 2, 3, 4, 5], then 3 and 4 are collected by the batcher and sent to the backend. The data for [1, 2, 5] comes directly from the cache.

In the `qo` object, batched queries differ only in the `queryFn`, which uses a batcher instead of a direct fetch:

```ts
lesson: (lessonId: string) =>
  queryOptions<LudoLesson>({
    queryKey: qk.lesson(lessonId),
    queryFn: () => lessonBatcher.fetch(lessonId),
    staleTime: 60_000,
  }),
```

The batcher is created with a batcher factory:

```ts
export const lessonBatcher = makeIdBatcher<LudoLesson>({
  name: "lesson",
  getUrlFn: GET_LESSONS_FROM_IDS,
  idsKey: "lessonIds",
  scheduler: windowScheduler(10),
  createFn: create,
});
```

## Mutating and Invalidating Queries

When server-side data changes, the corresponding query in the cache must be updated. This is done either by directly replacing the cached value with `setQueryData()` or by forcing a refetch with `invalidateQueries()`.

All mutations can be find in the `mutations`. For example, here is a submit lesson mutation that defines its key and mutation function. Anything that happens after the mutation (unpacking the response, updating queries) is done in each queries `onSuccess()` function. For Lesson submissions, this would be `useSubmitLesson()`. These mutation hooks can be found in `/src/Hooks/Queries/Mutations`

```ts
export const mutations = {
  submitLesson: () => {
    return mutationOptions<LessonCompletionPacket, Error, LessonSubmission>({
      mutationKey: ["submitLesson"],
      mutationFn: (variables) =>
        ludoPost<LessonCompletionPacket, LessonSubmission>(
          SUBMIT_LESSON,
          variables,
          true
        ),
    });
  },
}
```

### Using `setQueryData()`

Use this when the server returns the updated data. After a lesson is completed, the server response includes the updated lesson, so the cache can be updated without refetching.

```ts
const qc = useQueryClient();

const { updatedCompletedLesson } = serverResponse.content;

// Replace the cached lesson data with the updated result
qc.setQueryData(
  qk.lesson(updatedCompletedLesson.id),
  updatedCompletedLesson
);
```

### Using `invalidateQueries()`

Use this when the server does not return the updated data. In this case, the cache is invalidated and the query refetches from the backend.

For example, a user’s streak history is not returned after completing a lesson, so its query needs to be invalidated:

```ts
const qc = useQueryClient();

qc.invalidateQueries({ queryKey: qk.streakPastWeek() });
```

These two operations cover the majority of mutation scenarios: either update the cache directly when the new data is available, or invalidate and refetch when it is not.
</pre>