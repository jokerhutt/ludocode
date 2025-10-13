import { createRouter, createRouterConfig, createRoute, Outlet, createRootRoute } from '@tanstack/react-router'
import { TutorialPage } from '../features/Tutorial/TutorialPage'
import { ExerciseComponent } from '../features/Exercise/ExerciseComponent'
import { HomePage } from '../features/Home/HomePage'

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

export const UnitsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `/course/$courseName/unit/$position`
})

const routeTree = rootRoute.addChildren([indexRoute, tutorialRoute])
export const router = createRouter({routeTree})
