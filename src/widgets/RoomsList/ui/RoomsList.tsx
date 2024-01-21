import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RoomsList.module.scss'
import RoomCard from '@/entities/Room/ui/RoomCard'
import { useTranslation } from 'react-i18next'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import { RoomType } from '@/entities/Room'

export type Room = {}

interface RoomsListProps {
    className?: string
    rooms: RoomType[]
}

const RoomsList = ({ className, rooms }: RoomsListProps) => {
    const { t } = useTranslation()

    return (
        <div className={classNames(cls?.RoomsList, {}, [className])}>
            <div className={cls.Header}>
                <AppIcon name='dashboard' />
                <h2>{t('mainRoomsTitle')}</h2>
            </div>
            <div className={cls.RoomsListContainer}>
                {rooms.map((value, index, array) => (
                    <RoomCard
                        key={index}
                        className={cls.Card}
                        data-key={index}
                        room={value}
                    />
                ))}
            </div>
        </div>
    )
}

export default RoomsList
