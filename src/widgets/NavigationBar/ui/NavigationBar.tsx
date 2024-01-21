import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NavigationBar.module.scss'
import {
    type AppRoutes,
    NavigationBarLinks
} from '@/shared/config/routeConfig/routeConfig'
import AppLink from '@/shared/ui/AppLink/AppLink'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LanguageSwitcher } from '@/features/LanguageSwitcher'

interface NavbarProps {
    className?: string
    hide?: boolean
}

const NavigationBar = ({ className, hide = false }: NavbarProps) => {
    return (
        <div
            className={classNames(cls?.Navbar, { [cls.Hide]: hide }, [
                className
            ])}
        >
            <div className={cls.NavbarTop}>
                <ThemeSwitcher />
                <LanguageSwitcher />
            </div>
            {Object.entries(NavigationBarLinks).map(([key, path]) => (
                <AppLink
                    key={path}
                    to={path}
                    route={key as AppRoutes}
                    className={cls.NavbarItem}
                />
            ))}
        </div>
    )
}

export default NavigationBar
