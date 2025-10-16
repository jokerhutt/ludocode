import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
import { TutorialPage } from '../features/Tutorial/TutorialPage'
import { HomePage } from '../features/Home/HomePage'
import { CoursePage } from '../features/Course/CoursePage'

const rootRoute = createRootRoute()

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage
})

export const tutorialRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `/tutorial/$tutorialId/exercise/$position`,
    component: TutorialPage
})

export const unitsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `/course/$courseName/unit/$position`,
    component: CoursePage
})

const routeTree = rootRoute.addChildren([indexRoute, tutorialRoute, unitsRoute])
export const router = createRouter({routeTree})