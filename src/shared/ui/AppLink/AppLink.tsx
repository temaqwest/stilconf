import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'
import React, { type FC } from 'react'
import { NavLink, type NavLinkProps } from 'react-router-dom'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import { AppRoutes } from '@/shared/config/routeConfig/routeConfig'
interface AppLinkProps extends NavLinkProps {
    className?: string
    route: AppRoutes
}

const AppLink: FC<AppLinkProps> = (props) => {
    const { to, className, route, children, ...args } = props

    const PathIcon = {
        [AppRoutes.MAIN]: 'home',
        [AppRoutes.CREATESESSION]: 'add',
        [AppRoutes.JOIN]: 'camera',
        [AppRoutes.ABOUT]: 'about'
    } as const

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.AppLink, { [cls.linkActive]: isActive }, [
                    className
                ])
            }
            {...args}
        >
            <AppIcon className={cls.AppLinkIcon} name={PathIcon[route]} />
        </NavLink>
    )
}

export default AppLink
