import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './UserItem.module.scss'
import AppAvatar from '@/shared/ui/AppAvatar/AppAvatar'

interface UserItemProps {
    className?: string
    user: string
}

const UserItem = ({ className, user }: UserItemProps) => {
    return (
        <div className={classNames(cls?.UserItem, {}, [className])}>
            <AppAvatar username={user} className={cls.UserAvatar} />
            <span className={cls.UserName}>{user}</span>
        </div>
    )
}

export default UserItem
