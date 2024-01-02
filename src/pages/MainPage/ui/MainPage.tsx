import React from 'react'
import cls from './MainPage.module.scss'
import ActionCard from '@/entities/ActionCard/ActionCard'
import DateTimeCard from '@/entities/DateTimeCard/DateTimeCard'
import { useTranslation } from 'react-i18next'
import { RecentList } from '@/widgets/RecentList'

function MainPage() {
    const { t } = useTranslation()

    return (
        <div className={cls.MainPage}>
            <div className={cls.MainGrid}>
                <div className={cls.ActionsColumn}>
                    <ActionCard
                        path='/join'
                        icon='camera'
                        subtitle={t('joinCardSubtitle')}
                        title={t('joinCardTitle')}
                        color='blue'
                    />
                    <ActionCard
                        path='/create'
                        icon='add'
                        subtitle={t('createCardSubtitle')}
                        title={t('createCardTitle')}
                        color='green'
                    />
                    <ActionCard
                        icon='time'
                        subtitle={t('recentCardSubtitle')}
                        title={t('recentCardTitle')}
                        color='purple'
                    />
                </div>
                <div className={cls.InfoColumn}>
                    <DateTimeCard />
                    <RecentList className={cls.Recent} />
                </div>
            </div>
        </div>
    )
}

export default MainPage
