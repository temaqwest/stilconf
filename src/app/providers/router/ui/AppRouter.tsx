import React, { Suspense } from 'react'
import { LoadingPage } from '@/pages/LoadingPage'
import { Route, type RouteProps, Routes } from 'react-router-dom'
import { routeConfig } from '@/shared/config/routeConfig/routeConfig'
import { AboutPage } from '@/pages/AboutPage'
import { MainPage } from '@/pages/MainPage'

function AppRouter() {
    return (
        <Suspense fallback={<LoadingPage />}>
            <Routes>
                {Object.values(routeConfig).map((route: RouteProps) => {
                    return (
                        <Route
                            path={route.path}
                            element={route.element}
                            key={route.path}
                        />
                    )
                })}
                <Route path={'/about'} element={<AboutPage />} />
                <Route path={'/'} element={<MainPage />} />
            </Routes>
        </Suspense>
    )
}

export default AppRouter
