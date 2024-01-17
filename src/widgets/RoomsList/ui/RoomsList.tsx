import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RoomsList.module.scss'
import RoomCard from '@/entities/Room/ui/RoomCard'
import { useTranslation } from 'react-i18next'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import { randomString } from '@/shared/lib/randomString/randomString'

interface RoomsListProps {
    className?: string
}

const RoomsList = ({ className }: RoomsListProps) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(cls?.RoomsList, {}, [className])}>
            <div className={cls.Header}>
                <AppIcon name='dashboard' />
                <h2>{t('mainRoomsTitle')}</h2>
            </div>
            <div className={cls.RoomsListContainer}>
                {[...new Array(5)].map((value, index, array) => (
                    <RoomCard
                        key={index}
                        className={cls.Card}
                        data-key={index}
                        room={{
                            roomId: randomString(),
                            participants: ['Alex', 'Nikolay', 'George']
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default RoomsList
