import { type RouteProps } from 'react-router-dom'
import { MainPage } from '@/pages/MainPage'
import { AboutPage } from '@/pages/AboutPage'
import { JoinPage } from '@/pages/JoinPage'
import { CreateSessionPage } from '@/pages/CreateSessionPage'

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    CREATESESSION = 'createsession',
    JOIN = 'join'
}

export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CREATESESSION]: '/create',
    [AppRoutes.JOIN]: '/join',
    [AppRoutes.ABOUT]: '/about'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePaths.main,
        element: <MainPage />
    },
    [AppRoutes.CREATESESSION]: {
        path: RoutePaths.createsession,
        element: <CreateSessionPage />
    },
    [AppRoutes.JOIN]: {
        path: RoutePaths.join,
        element: <JoinPage />
    },
    [AppRoutes.ABOUT]: {
        path: RoutePaths.about,
        element: <AboutPage />
    }
}
