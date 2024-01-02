import React, { type ButtonHTMLAttributes, type FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppButton.module.scss'

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ButtonTheme
    size?: ButtonSize
}

export enum ButtonTheme {
    CLEAR = 'clear',
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

export enum ButtonSize {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small'
}

const AppButton: FC<AppButtonProps> = (props: AppButtonProps) => {
    const { className, children, theme, size, ...args } = props

    return (
        <button
            className={classNames(cls?.AppButton, {}, [
                className,
                cls[theme],
                cls[size ?? ButtonSize.MEDIUM]
            ])}
            {...args}
        >
            {children}
        </button>
    )
}

export default AppButton
