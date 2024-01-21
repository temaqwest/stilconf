import React, { useEffect, useState } from 'react'
import cls from './MainPage.module.scss'
import ActionCard from '@/entities/ActionCard/ActionCard'
import DateTimeCard from '@/widgets/DateTimeCard/DateTimeCard'
import { useTranslation } from 'react-i18next'
import { RoomsList } from '@/widgets/RoomsList'
import { SocketEvent, useSocket } from '@/shared/api'
import { RoomType } from '@/entities/Room'

function MainPage() {
    const { t } = useTranslation()
    const socket = useSocket()
    const [rooms, setRooms] = useState<RoomType[]>([])

    useEffect(() => {
        socket.sendMessage({
            event: SocketEvent.GetRooms
        })

        socket.onMessage(SocketEvent.GetRooms, (message) => {
            console.log(message)
            setRooms(message.data)
        })

        // return () => {
        //     socket.instance.close()
        // }
    }, [])

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
                    <RoomsList rooms={rooms} className={cls.Recent} />
                </div>
            </div>
        </div>
    )
}

export default MainPage
