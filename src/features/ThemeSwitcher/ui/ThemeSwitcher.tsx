import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ThemeSwitcher.module.scss'
import { Theme, useTheme } from '@/app/providers/ThemeProvider'
import React from 'react'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import AppButton, { ButtonTheme } from '@/shared/ui/AppButton/AppButton'

interface ThemeSwitcherProps {
    className?: string
}

const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()

    return (
        <AppButton
            onClick={toggleTheme}
            title='Сменить тему'
            theme={ButtonTheme.CLEAR}
            className={classNames(
                cls.ThemeSwitcher,
                { [cls?.Dark]: theme === Theme.DARK },
                [className]
            )}
        >
            <AppIcon name='theme' className={cls.ThemeSwitcherIcon} />
        </AppButton>
    )
}

export default ThemeSwitcher
