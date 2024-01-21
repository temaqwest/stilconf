import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './UserItem.module.scss'
import UserItem from './UserItem'

interface UserContainerProps {
    className?: string
    users: string[]
}

const UserContainer = ({ className, users }: UserContainerProps) => {
    return (
        <div className={classNames(cls?.UserContainer, {}, [className])}>
            {users.map((user) => (
                <UserItem user={user} key={user} />
            ))}
        </div>
    )
}

export default UserContainer
