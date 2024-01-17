import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './UserItem.module.scss'
import { User } from '../api/types'
import AppAvatar from '@/shared/ui/AppAvatar/AppAvatar'

interface UserItemProps {
    className?: string
    user: User
}

const UserItem = ({ className, user }: UserItemProps) => {
    return (
        <div className={classNames(cls?.UserItem, {}, [className])}>
            <AppAvatar username={user.username} />
            <span className={cls.UserName}>{user.username}</span>
        </div>
    )
}

export default UserItem
