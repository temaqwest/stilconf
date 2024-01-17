import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RoomCard.module.scss'
import AppButton, { ButtonSize } from '@/shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'
import AppAvatar from '@/shared/ui/AppAvatar/AppAvatar'
import { RoomType } from 'src/entities/Room'

interface RoomCardProps {
    className?: string
    room: RoomType
}

const RoomCard = ({ room, className, ...other }: RoomCardProps) => {
    const { t } = useTranslation()

    return (
        <div {...other} className={classNames(cls?.RoomCard, {}, [className])}>
            <div className={cls.Info}>
                <h3 className={cls.Title}>
                    {t('roomName')}{' '}
                    <strong data-key={room.roomId}>
                        {room.roomId.slice(-5)}
                    </strong>
                </h3>
                <div className={cls.Participants}>
                    {room.participants.map((u) => (
                        <AppAvatar
                            className={cls.Avatar}
                            username={u}
                            key={u}
                        />
                    ))}
                </div>
            </div>
            <AppButton size={ButtonSize.SMALL}>{t('join')}</AppButton>
        </div>
    )
}

export default RoomCard
