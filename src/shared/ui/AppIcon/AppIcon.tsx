import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppIcon.module.scss'
import React, { type FC } from 'react'

interface AppIconProps {
    name?: string
    className?: string
}

const AppIcon: FC<AppIconProps> = (props) => {
    const { className, name, ...args } = props

    return (
        <svg className={classNames(cls.AppIcon, {}, [className])}>
            <use xlinkHref={`#${name}`} />
        </svg>
    )
}

export default AppIcon
