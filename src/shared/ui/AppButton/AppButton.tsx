import React, {ButtonHTMLAttributes, FC} from 'react';
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './AppButton.module.scss'

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ButtonTheme
}


export enum ButtonTheme {
    CLEAR = 'clear',
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

const AppButton: FC<AppButtonProps> = (props: AppButtonProps) => {
    const {className, children, theme, ...args} = props

    return (
        <button className={classNames(cls?.AppButton, {}, [className, cls[theme]])} {...args}>
            {children}
        </button>
    );
};

export default AppButton;
