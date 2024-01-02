import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RecentList.module.scss'
import RecentCard from '@/entities/RecentCard/RecentCard'
import { useTranslation } from 'react-i18next'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'

interface RecentListProps {
    className?: string
}

const RecentList = ({ className }: RecentListProps) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(cls?.RecentList, {}, [className])}>
            <div className={cls.Header}>
                <h2>
                    <AppIcon name="time"/> &nbsp;
                    {t('mainRecentTitle')}
                </h2>
            </div>
            <div className={cls.RecentListContainer}>
                {
                    [...new Array(20)].map((value, index, array) => (
                        <RecentCard key={index} className={cls.Card} data-key={index}/>
                    ))
                }
            </div>
        </div>
    )
}

export default RecentList
