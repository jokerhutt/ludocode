# LudoCode Frontend

## Table of Contents
1. [Overview](#overview)
2. [Attributions](#attributions)
3. [Features](#features-frontend)
4. [Planned Features](#planned-features)
5. [Running the project](#running-the-project-locally)

## Overview
This repository contains the frontend code for Ludocode, a code learning website intended primarily as a showcase project for Mimo.

The project is written using React, Typescript, Tailwind CSS, ShadCN UI, and Tanstack query, form, & router.

To run the project locally in any meaningful way, it is required to also run the Kotlin postgreSQL backend as it is required for verification, fetching courses, etc. For the setup instructions, visit: https://github.com/jokerhutt/ludocode-backend

## Attributions
This project uses assets from the LottieFiles Community for animations under the Lottie Simple License.
- Lesson complete trophy animation: Mahendra Bhunwal
    - https://lottiefiles.com/mahendra

## Features (Frontend)

- Interactive exercise formats.
- Multiple exercise types (Cloze, MCQ, Trivia, Info).
- Streaks & coins system.
- Onboarding flow for new users.
- Animations using Lottie framework.
- In browser editor with autosave & file tree using Monaco Editor.
- Users can create and delete code projects/files
- Users can execute code on the backend
- User Interface with zod validation for admins to edit courses and their contents.
- Admins can add, edit, delete, and rearrange: courses, modules, lessons, exercises, and exercise options.
- Batched fetching using batshit library.
- Deduplicated mutations using request hashes.
- Cached server state using Tanstack Query.
- Google Oauth Authentication.
- Form validation using Zod & Tanstack Form.

## Planned Features
- User dashboard
- AI chatbot assistant

## Running the project locally
1. Clone the repository
```
git@github.com:jokerhutt/ludocode.git
```
2. Install dependencies
```
npm i
```
3. Run the backend

The instructions for running the backend can be found at https://github.com/jokerhutt/ludocode-backend