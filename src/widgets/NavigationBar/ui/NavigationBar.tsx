import React from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './NavigationBar.module.scss'
import {AppRoutes, RoutePaths} from "@/shared/config/routeConfig/routeConfig";
import AppLink from "@/shared/ui/AppLink/AppLink";
import {ThemeSwitcher} from "@/widgets/ThemeSwitcher";

interface NavbarProps {
    className?: string
}

const NavigationBar = ({className}: NavbarProps) => {
    return (
        <div className={classNames(cls?.navbar, {}, [className])}>
            <div className={cls.navbarTop}>
                <ThemeSwitcher/>
            </div>
            {
                Object.entries(RoutePaths).map(([key, path]) => (
                    <AppLink key={path} to={path} route={key as AppRoutes} className={cls.navbarItem}/>
                ))
            }
        </div>
    );
};

export default NavigationBar;
