import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppAvatar.module.scss'

interface AppAvatarProps {
    className?: string
    image?: string
    username: string
}

const AppAvatar = ({ className, image = '', username }: AppAvatarProps) => {
    return (
        <div className={classNames(cls?.AppAvatar, {}, [className])}>
            {image ? (
                <img src={image} alt={username} />
            ) : (
                <span className={cls.Name}>{username.slice(0, 1)}</span>
            )}
        </div>
    )
}

export default AppAvatar
