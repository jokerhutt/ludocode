<h1 align="center">Fetching the Catalog Tree</h1>

## Overview

This document explains how the catalog tree is fetched. For information on how it is used how it more on how it is used (e.g. tracking and updating the current lesson see [Tracking progress in a course](./tracking-course-progress.md))

The catalog tree is the tree that holds the modules and lessons for each course.

---

## FlatCourseTree

The `FlatCourseTree` is the data structure that holds the structure of the catalog as ids.  
It ties a course to its respective module ids, and each module id to its respective lesson ids.

```ts
export type FlatCourseTree = {
  courseId: string;
  modules: FlatModule[];
};

export type FlatModule = {
  id: string;
  orderIndex: number;
  lessons: FlatLesson[];
};

export type FlatLesson = {
  id: string;
  orderIndex: number;
};
```

---

## `useTreeData()`

The `useTreeData()` hook is responsible for taking the `FlatCourseTree` and:

- fetching all modules for a course
- fetching all lessons for the currently requested module

Example: if the user goes to:

```
/courses/1/modules/1
```

then `useTreeData()`:

1. fetches all modules for course `1` (including module `1`)
2. fetches all of module `1`’s lessons
3. stores the fetched modules and lessons in the TanStack Query cache

If the user then visits module `2`, the modules are already in the cache, so only module `2`’s lessons need to be fetched. Those lessons are then cached as well.

If the user goes back to module `1`, both the module and its lessons are already cached, so they are instantly available and do not require a refetch from the server.

---

## Benefits of using ids for the tree

By storing the tree as ids and order indexes rather than the content itself, the static structure of the catalog (how modules/lessons are ordered and related) is kept separate from the content that does change (for example, whether a lesson or module is complete).

Each module and lesson is stored under its own query key.

This means updating a lesson (e.g. marking it as complete) can be done by invalidating that specific lesson’s query, without needing to invalidate or refresh the entire tree.

---

## Using the tree data

On the page itself, the `ModuleLayout.tsx` component uses the hook like this:

```ts
const { tree } = moduleRoute.useLoaderData();

const { courseProgress, modules, lessons } = useTreeData({
  tree,
  courseId,
  moduleId,
});
```

From there, the page has:

- `courseProgress` for the current user
- the list of modules for the course
- the list of lessons for the current module

Any changes to a module’s lessons (for example, completing a lesson) can be handled by invalidating just that lesson’s query, while the tree and the rest of the cached data stay intact.
