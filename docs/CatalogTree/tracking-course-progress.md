<h1 align="center">Tracking Course Progress</h1>

## Overview

This document explains how the user's current lesson & completed lessons are calculated and updated. For information on how the course catalog is fetched, see [Catalog Tree & Fetching](./catalog-tree-fetching.md)

---

## LudoLesson

The `LudoLesson` is the data structure that holds the data for a specific lesson, including whether it has been completed or not. The `isCompleted` property is computed by the backend and send as part of the response.

```ts
export type LudoLesson = {
    id: string,
    title: string,
    orderIndex: number,
    isCompleted: boolean 
}
```

## CourseProgress

The `CourseProgress` type holds data for the user's progress in a course. Each user can have exactly one course progress per course. 

The `currentLessonId` property is used to determine the user's current lesson.

## Deriving completion on the UI

Using `LudoLesson` and `CourseProgress`, we are able to derive:

```ts
lesson.isCompleted ? "COMPLETED"
courseProgress.currentLessonId == lesson.id ? "CURRENT" :
"LOCKED"
```

## Updating the current lesson

When a user completes a lesson, as part of its `LessonCompletionResponse` the server returns:

```ts
newCourseProgress: CourseProgress; 
// The updated course progress after moving to the next lesson

updatedCompletedLesson: LudoLesson;
// The lesson that just got marked completed, now reflecting `isCompleted: true`
```

With this, all we need to do is to set the query data for `qk.courseProgress()` and `qk.lesson(lessonId)` to the returned data from the server.

