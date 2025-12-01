<h1 align="center">Routes & Layouts</h1>

## Overview

This document explains how TanStack Router is used

Almost all routes live under the `authedRoute` route. The only exceptions are the `demoRoute` and the `authRoute`.

The `authRoute` acts as a guard, its preloader verifies that the user is logged in, and if not throws a redirect to `authRoute`.

The Routes Tree looks like this:
```
root
    auth
    demoLogin
    onboarding
    app
        hub
            courses
            modules
            playground
            builderSelect
        lessons
        sync
        completion
        builder
```

## The App Route

The App route holds all the routes that a user accesses after they have been authenticated. It acts as an authenticated shell.

## The Hub Route

The Hub route acts as the navigation shell/hub for the website. It holds layouts and pages related to navigating around the site. 

For example, when a user goes from the courses page to the modules path page or the playground page, they are in the hub route. Once they start a lesson, they leave the hub route and are taken to the lesson route. After completing a lesson and seeing their summaries, they are taken back to the hub route (module page)

## The Lessons Route

```ts
/course/$courseId/lesson/$lessonId
```
The lessons route is a layout route that provides the context and structure for lessons. It has the active lesson's `courseId` and `lessonId`. Is also uses the current exercises position as a search parameter. In this way, if a user wants to go to the next exercise, the site navigates them to the current `exercise` search param + 1;

## The Completion Route

## The Projects Route
