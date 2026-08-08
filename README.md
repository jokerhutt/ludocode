# LudoCode Frontend

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Features](#core-features)
4. [Screenshots](#screenshots)
5. [Naming & Trademark](#naming--trademark)
6. [Attributions](#attributions)

## Overview

This repository contains the frontend code for Ludocode, an open source code learning website.

The project is written using React, Typescript, Tailwind CSS, ShadCN UI, and Tanstack query, form, & router. On the backend, the project uses Kotlin & PostgreSQL.

## Quick Start

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js 22+](https://nodejs.org/)

### 1. Start the backend

```bash
git clone git@github.com:jokerhutt/ludocode-backend.git
cd ludocode-backend
cp .env.example .env

docker compose -f docker-compose.db.yml up -d
docker compose -f docker-compose.ludocode.yml up -d --build ludocode-backend
```

### 2. Start the frontend

```bash
git clone git@github.com:jokerhutt/ludocode.git
cd ludocode
npm install

# Web app (http://localhost:5173)
cd apps/web && cp .env.example .env && npm run dev &

# Admin app (http://localhost:5174)
cd ../admin && cp .env.example .env && npm run dev
```

The API is available at `http://localhost:8080` with a pre-seeded demo user and course.

For enabling OAuth, AI, code execution, and other features, see the [full documentation](https://ludocode.dev/docs).

## Core Features

### 📘 Interactive Lessons

- Interactive exercises with multiple formats
- In-editor guided lessons with sandboxed code execution & output validation
- Ability to have multiple courses & lessons
- Streaks, points, & progress tracking

### 💻 Code Execution, Hosted Sites, & Editor

- In-browser WebSocket-based code editor with multiple languages
- In-browser editor supporting web projects with iframe preview and shareable URL
- Configurable code execution engine for backend execution
- Device-aware "Desktop Only" guard for editor-heavy pages

### 📚 Course Creation & Management

- Create & modify courses via WYSIWYG editor while preserving user progress
- Create courses using YAML with a defined schema
- Ability to archive published courses

### ✨ AI Integration

- Configurable, context-aware AI assistant in lessons & projects

### 🌐 Social

- Share, like, & duplicate projects
- User profiles

### 🔐 Authentication

- Firebase authentication (email, Google, GitHub)
- Optional demo-mode authentication (no Firebase required)
- Account deletion & logout

### 📢 Platform Features

- Animations with Framer Motion & Lottie
- Configurable banner system
- Onboarding flows for new users
- Responsive UI for desktop & mobile

### ⚙️ Architecture

- Cached server state via TanStack Query
- Batched fetching using batshit
- Form handling with Zod & TanStack Form

## Previews

### Paths

<img width="3024" height="1604" alt="ludocode dev_app_learn_312277a6-64bd-4fa4-bbf6-9aeea88a59ec_0b83682e-b3e4-46f0-b794-2b15002805c0" src="https://github.com/user-attachments/assets/d5e71000-8723-4b72-a4e9-a0f8afd50bf5" />

### Lessons

<img width="3024" height="1604" alt="ludocode dev_app_courses (1)" src="https://github.com/user-attachments/assets/6128a4ea-2cc2-4d99-9c51-8cd7b9681086" />

### Guided Projects

<img width="3024" height="1604" alt="ludocode dev_app_courses (3)" src="https://github.com/user-attachments/assets/85fe4b0f-1e57-4dad-9114-42119bc5371f" />

### Web Editor

<img width="3024" height="1604" alt="ludocode dev_app_courses" src="https://github.com/user-attachments/assets/d2a4d2c0-e0e3-49f8-8f37-af33af754c84" />

## Naming & Trademark

"Ludocode" is a trademark of the Ludocode project.

The source code in this repository is open source and can be used, modified, and even commercialized.

If you build a commercial product or hosted service based on this project, please use a different name and branding so it is not confused with the official Ludocode project.

## Attributions

This project uses assets from the LottieFiles Community for animations under the Lottie Simple License.

- Lesson complete trophy animation: Mahendra Bhunwal
  - https://lottiefiles.com/mahendra
