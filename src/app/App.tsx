import './styles/main.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/app/providers/ThemeProvider'
import { AppRouter } from '@/app/providers/router'
import { NavigationBar } from '@/widgets/NavigationBar'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import IconsSprite from '@/shared/assets/iconsSprite'
import { Suspense, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppRoutes, RoutePaths } from '@/shared/config/routeConfig/routeConfig'
function App() {
    const { theme } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    console.log({ loc: location.pathname, conf: RoutePaths.conference })
    useEffect(() => {
        if (
            !localStorage.getItem('user') &&
            location.pathname !== RoutePaths.whatsyournametraveler
        ) {
            navigate(RoutePaths.whatsyournametraveler)
        }
    }, [location])

    return (
        <Suspense fallback=''>
            <div className={classNames('app', {}, [theme])}>
                <IconsSprite />
                <NavigationBar
                    hide={location.pathname.includes(AppRoutes.CONFERENCE)}
                />
                <main className='main'>
                    <AppRouter />
                </main>
            </div>
        </Suspense>
    )
}

export default App
