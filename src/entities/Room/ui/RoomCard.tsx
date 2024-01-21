import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RoomCard.module.scss'
import AppButton, { ButtonSize } from '@/shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'
import AppAvatar from '@/shared/ui/AppAvatar/AppAvatar'
import { RoomType } from 'src/entities/Room'
import { useNavigate } from 'react-router-dom'

interface RoomCardProps {
    className?: string
    room: RoomType
}

const RoomCard = ({ room, className, ...other }: RoomCardProps) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    function onJoinRoom() {
        navigate(`/join/${room.chatId}`)
    }

    return (
        <div {...other} className={classNames(cls?.RoomCard, {}, [className])}>
            <div className={cls.Info}>
                <h3 className={cls.Title}>
                    {t('roomName')}{' '}
                    <strong data-key={room.chatId}>{room.chatId}</strong>
                </h3>
                <div className={cls.Participants}>
                    {room.registeredUsers.length
                        ? room?.registeredUsers?.map((u) => (
                              <AppAvatar
                                  className={cls.Avatar}
                                  username={u.userId}
                                  key={u.token}
                              />
                          ))
                        : t('noRegisteredUsers')}
                </div>
            </div>
            <AppButton size={ButtonSize.SMALL} onClick={onJoinRoom}>
                {t('join')}
            </AppButton>
        </div>
    )
}

export default RoomCard
