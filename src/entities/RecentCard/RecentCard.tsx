import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RecentCard.module.scss'

interface RecentCardProps {
    className?: string
}

const RecentCard = ({ className, ...other }: RecentCardProps) => {
    return (
        <div
            {...other}
            className={classNames(cls?.RecentCard, {}, [className])}
        ></div>
    )
}

export default RecentCard
