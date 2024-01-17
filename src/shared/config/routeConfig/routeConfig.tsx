import { type RouteProps } from 'react-router-dom'
import { JoinSessionPage } from '@/pages/JoinSessionPage'
import { ConferencePage } from '@/pages/ConferencePage'
import { CreateSessionPage } from '@/pages/CreateSessionPage'
import { MainPage } from '@/pages/MainPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export enum AppRoutes {
    MAIN = 'main',
    CREATESESSION = 'createsession',
    NOTFOUND = 'notfound',
    JOIN = 'join',
    JOINDETAIL = 'joindetail',
    CONFERENCE = 'conference'
}

export const RoutePaths: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CREATESESSION]: '/create',
    [AppRoutes.CONFERENCE]: '/conference/:roomId',
    [AppRoutes.JOIN]: '/join',
    [AppRoutes.JOINDETAIL]: '/join/:roomId',
    [AppRoutes.NOTFOUND]: '*'
}

export const NavigationBarLinks: Partial<Record<AppRoutes, string>> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.CREATESESSION]: '/create',
    [AppRoutes.JOIN]: '/join'
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
        element: <JoinSessionPage />
    },
    [AppRoutes.JOINDETAIL]: {
        path: RoutePaths.joindetail,
        element: <JoinSessionPage />
    },
    [AppRoutes.CONFERENCE]: {
        path: RoutePaths.conference,
        element: <ConferencePage />
    },
    [AppRoutes.NOTFOUND]: {
        path: RoutePaths.notfound,
        element: <NotFoundPage />
    }
}
