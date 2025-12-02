<h1 align="center">Lesson Completions</h1>

## Table of Contents
1. [Overview](#overview)
2. [Sync Page](#sync-page)
3. [Duplicate Submissions](#duplicate-submissions)
4. [Completion Page(s)](#completion-pages)
   - [Completion Page Order Logic](#completion-page-order-logic)

## Overview

This document describes how a lesson submission is processed, how the result is synchronized with the backend, and how the client determines which completion screen(s) to show based on the returned data.


### Sync Page

When a user completes their lesson, the lesson page navigates to the sync page with a `LessonSubmission` object.

With a `useEffect()`, the sync page calls the `useSubmitLesson()` hook. This hook then generates sends the submission to the backend and receives a `LessonCompletionPacket` which has the following structure:

```ts
export type LessonCompletionPacket = {
  content: LessonCompletionResponse;
  status: LessonCompletionStatus;
};

export type LessonCompletionResponse = {
  newCoins: UserCoins;
  newStreak: UserStreak;
  newCourseProgress: CourseProgress;
  updatedCompletedLesson: LudoLesson;
  accuracy: number;
};
```
In the mutations `onSuccess()` handler, the respective queries such as the users coins or current lesson are updated/invalidated, and the sync page then navigates to the completion page using the following search parameters:

```ts
export type LessonCompletionStatus = "OK" | "COURSE_COMPLETE" | "DUPLICATE";

export type CompletionState = {
  courseId: string;
  courseName: string;
  lessonId: string;
  search: CompletionSearch;
};

export type CompletionSearch = {
  step: "lesson" | "streak" | "course";
  coins: number;
  accuracy: number;
  oldStreak: number;
  newStreak: number;
  completionStatus: LessonCompletionStatus;
};
```

## Duplicate Submissions
In case of a duplicate submission, the lesson page generates a unique identifier for the submission that gets sent to the backend. If the same lesson has been sent twice, the backend will catch this and return `"DUPLICATE"` as the `CompletionSearch`

## Completion Page(s)

The `CompletionState` object provides all the necessary information for displaying the three main completion pages:

- The 'lesson' page, which provides an overview of the users new points & their accuracy for the lesson.
- The 'streak' page, which appears if the users streak has increased.
    - This is derived by `oldStreak < newStreak`
- The 'course' page, which appears if the user has just completed the course for the first time.
    - This is derived by `completionStatus === "COURSE_COMPLETE"`

Navigation is done using the `step` search parameter of the `CompletionSearch` object.

### Completion Page Order Logic
```
1. always lesson
2. if streak changed → streak
3. if course complete → course
```