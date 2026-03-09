# LudoCode Frontend

## Table of Contents

1. [Overview](#overview)
2. [Running the project](#running-the-project-locally)
3. [Features](#features)
4. [Screenshots](#screenshots)
4. [Attributions](#attributions)

## Overview

This repository contains the frontend code for Ludocode, an open source code learning website.

The project is written using React, Typescript, Tailwind CSS, ShadCN UI, and Tanstack query, form, & router. On the backend, the project uses Kotlin & PostgreSQL.

## Running the project locally

This project is made so that you can run it locally without needing to provide any credentials. For setup instructions on running the project locally & enabling features, see the web docs: https://ludocode.dev/resources/docs

## Features

- Interactive exercises with multiple formats
- Ability to have multiple courses & lessons
- Streaks, points, & progress tracking
- In-browser code editor with multiple languages supported
- Configurable code execution engine for users to execute code on the backend
- Configurable, context aware AI assistant in lessons & projects
- Ability to create & modify courses with a WYSIWYG editor while preserving user progress
- Ability to create courses using YAML with a provided schema
- Ability to archive published courses
- User profiles
- Firebase authentication with email, google, & github
- Optional demo-mode authentication without need for firebase
- Ability to delete accounts & logout
- Responsive UI for desktop & mobile devices
- Onboarding flows for new users
- Animations using Framer Motion & the Lottie framework
- Cached server state using Tanstack Query
- Batched fetching using batshit library
- Device aware 'Desktop Only' guard for pages such as code editor
- Form validation using Zod & Tanstack Form.


## Screenshots

### Learn page
![alt text](docs/media/learn-preview.png)

### Exercise
![alt text](docs/media/exercise-preview.png)

### Code Editor
![alt text](docs/media/code-editor-preview.png)

### Course Editor
![alt text](docs/media/course-editor-preview.png)

### Exercise Editor
![alt text](docs/media/exericse-editor-preview.png)

## Known Issues

### AI chatbot code blocks

One issue with the AI chatbot is codeblocks that have only one line are rendered as blank code blocks in the streamed response. This issue seems to be related to the Streamdown library which handles streamed AI responses. I have tried pre-formatting the chunks and modifying the streamdown code block parser to no avail.

## Attributions

This project uses assets from the LottieFiles Community for animations under the Lottie Simple License.

- Lesson complete trophy animation: Mahendra Bhunwal
  - https://lottiefiles.com/mahendra