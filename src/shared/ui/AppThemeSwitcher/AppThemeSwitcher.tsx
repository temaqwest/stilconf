import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './AppThemeSwitcher.module.scss'
import {useTheme} from "@/app/providers/ThemeProvider";
import React from "react";
import ThemeIcon from '@/shared/assets/theme.svg'

interface AppThemeSwitcherProps {
    className?: string
}

const AppThemeSwitcher = ({className}: AppThemeSwitcherProps) => {
    const {theme, toggleTheme} = useTheme()

    return (
        <button onClick={toggleTheme} className={classNames(cls?.AppThemeSwitcher, {}, [className])}>
            <ThemeIcon/>
        </button>
    );
};

export default AppThemeSwitcher;
