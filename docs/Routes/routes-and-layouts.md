<h1 align="center">Routes & Layouts</h1>

## Table of Contents
1. [Overview](#overview)
2. [Core Structure](#core-structure)
   - [Route Definitions](#route-definitions)
   - [Router Setup](#router-setup)
   - [Navigation Helper](#navigation-helper)
3. [Primary Routes](#primary-routes)
   - [Auth & Demo](#auth--demo)
   - [Onboarding](#onboarding)
4. [App Route](#app-route)
5. [Hub Routes](#hub-routes)
   - [Courses Hub](#courses-hub)
   - [Module Hub](#module-hub)
   - [Builder Hub](#builder-hub)
   - [Project Hub](#project-hub)
6. [Lessons](#lessons)
7. [Sync & Completion](#sync--completion)
8. [Projects](#projects)
9. [Builder](#builder)

## Overview

This document the routing system of Ludocode and its core routes / associated layouts.

TanStack Router defines the structural and navigational rules of the application. Almost every route is a child of `authedRoute`, meaning authenticated users are expected to operate within this tree. Two routes are exceptions: `authRoute` and `demoRoute`.

`authRoute` performs authentication checks. If the user is not logged in, the route throws a redirect to the login page before rendering anything.

The core route tree:

```
root
    auth
    demoLogin
    onboarding
    app
        hub
            coursesHub
            modulesHub
            projectHub
            builderHub
        lessons
        sync
        completion
        builder
```


---

## Core Structure

### Route Definitions

All route paths are defined as a `routes` object in:

```
src/constants/router/routes.ts
```

This file is the authoritative source for every path.

### Router Setup

The route tree, loaders, and configurations are located in:

```
src/routes
```

`router.tsx` is where the full route registry is constructed.

### Navigation Helper

The `ludoNavigation` helper provides typed navigation utilities. It avoids hardcoding paths and makes the intent of the navigation more explicit:

```ts
router.navigate(ludoNavigation.hub.module.toCurrent());

router.navigate(
  ludoNavigation.lesson.toNextExercise(lessonId, currentExercisePosition)
);
```

---

## Primary Routes

### Auth & Demo

```
Auth Base: /auth
Demo Base: /demo
```

- **Auth** renders the login UI and guards the rest of the app.
- **Demo** bypasses authentication entirely, issuing a demo token that logs the user in immediately.

### Onboarding

```
Base: /onboarding
Stage: /onboarding/$stage
```

Displayed when an authenticated user has no current course or preferences. The `stage` parameter controls which onboarding page is shown (e.g., experience selection).

---

## App Route

`/app` wraps all authenticated sections of the website. No screens under this route render unless authentication is satisfied. Once past authentication and onboarding, users navigate exclusively within `/app`.

---

## Hub Routes

The Hub acts as the user’s primary navigation container. It exposes course lists, module paths, and project / builder entry points.

### Courses Hub

```
Courses Base: /
```

The default entry point once authenticated. Displays course options. Choosing a course sets the user's current course and transitions to the module hierarchy.

### Module Hub

```
Module Hub Base: /course/$courseId/module/$moduleId
Module Redirect Base: /modules
```

Displays the lessons for a module and provides module-to-module navigation. Since the user's current module depends on their progress, navigation may first go through `/modules` before redirecting to the correct module.

### Builder Hub

```
Builder Hub Base: /builder/hub
```

Central listing of all courses available for editing. Selecting a course transitions to the Builder route.

### Project Hub

```
Project Hub Base: /project/hub
```

Lists user projects. Each project links to its respective detail route.

---

## Lessons

```
Base: /course/$courseId/lesson/$lessonId
Exercise: ?exercise=
```

Lessons are layout routes. The active lesson is defined by `courseId` and `lessonId`. Exercises are addressed using the `exercise` search parameter rather than separate routes, allowing incremental navigation via parameter updates.

---

## Sync & Completion

```
Sync Base: /lesson/$lessonId/sync
Completion Base: /completion/$courseId/lesson/$lessonId
```

After a lesson submission:

1. **Sync route** sends submission data to the backend and prepares the result.
2. **Completion route** displays lesson completion details. It uses `step` in the search params to progress through various result screens (e.g. lesson result, streak update, course end).

---

## Projects

```
Project Base: /project/$projectId
```

Provides the layout and context for the selected project.

---

## Builder

```
Builder Base: /build/course/$courseId
```

The course builder tracks module, lesson, and exercise selection via search parameters. These identifiers control which part of the course the user is editing and allow the builder UI to remain fully URL-driven.

---
