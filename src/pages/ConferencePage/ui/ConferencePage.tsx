import React, { useEffect, useState } from 'react'
import cls from './ConferencePage.module.scss'
import { ConferenceStreams } from '@/widgets/ConferenceStreams'
import useStreamUser from '@/entities/StreamUser/lib/useStreamUser'
import { useTheme } from '@/app/providers/ThemeProvider'
import { BottomConference } from '@/widgets/BottomConference'
import { useNavigate, useParams } from 'react-router-dom'
import { SocketEvent, useSocket } from '@/shared/api'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig'
import { RoomType } from '@/entities/Room'
import useWebRTC from '@/shared/lib/webrtc/useWebRTC'
import { classNames } from '@/shared/lib/classNames/classNames'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import { User } from '@/entities/User'

function ConferencePage() {
    const navigate = useNavigate()
    const { roomId } = useParams()
    const socket = useSocket()
    const { getStreamVideoTagSize } = useStreamUser()

    const { theme } = useTheme()

    const [chatData, setChatData] = useState([])
    const [users, setUsers] = useState<Record<string, string>>({})
    const [usersArr, setUsersArr] = useState<string[]>([])
    const [audio, setAudio] = useState(true)
    const [video, setVideo] = useState(true)

    const { clients, provideMediaRef, toggleCamera, toggleSound } =
        useWebRTC(roomId)

    function changeLocalAudio() {
        toggleSound(!audio)
        setAudio(!audio)
    }
    function changeLocalVideo() {
        toggleCamera(!video)
        setVideo(!video)
    }
    function leaveRoom() {
        navigate(RoutePaths.main)
    }

    function getUsersListAssoc() {
        const users: User[] = JSON.parse(sessionStorage.getItem('allUsers'))

        return users.reduce(
            (acc, cv) => {
                if (cv.userId === sessionStorage.getItem('userId')) {
                    acc['LOCAL_VIDEO'] = sessionStorage.getItem('user')
                } else {
                    acc[cv.userId] = cv.username
                }

                return acc
            },
            {} as Record<string, string>
        )
    }

    useEffect(() => {
        socket.connect()
        socket.sendMessage({ event: SocketEvent.GetRooms })

        setUsers(() => getUsersListAssoc())

        socket.onMessage(SocketEvent.GetRooms, (message) => {
            const room = message.data.find(
                (room: RoomType) => room.chatId === roomId
            )
            const chat = room.content
            const users: Array<User> = room.registeredUsers

            setChatData((prevData) => [...chat])
            setUsers(() => getUsersListAssoc())
            setUsersArr(() => [...users.map((u: any) => u.username)])
            console.log({ chat, users })
        })

        socket.onMessage(SocketEvent.OnMessage, (message) => {
            setChatData((prevState) => [...prevState, { ...message.data }])
        })
    }, [])

    return (
        <div className={cls.ConferencePage}>
            <ConferenceStreams className={cls.ConferenceContent}>
                {clients.map((clientId: string) => (
                    <div
                        key={clientId}
                        title={clientId}
                        className={classNames(
                            cls?.StreamUser,
                            { [cls.Speaking]: false },
                            [
                                cls[getStreamVideoTagSize(clients.length)],
                                cls[theme]
                            ]
                        )}
                    >
                        <video
                            playsInline
                            autoPlay
                            className={cls.StreamUserVideo}
                            ref={(instance) => {
                                provideMediaRef(clientId, instance)
                            }}
                        />
                        <div className={cls.StreamUserBottom}>
                            <span className={cls.Username}>
                                {users[clientId]}
                            </span>
                            <AppIcon
                                className={classNames(
                                    cls.Microphone,
                                    { [cls.MicrophoneSpeaking]: false },
                                    []
                                )}
                                name={'microphone'}
                            />
                        </div>
                    </div>
                ))}
            </ConferenceStreams>
            <BottomConference
                users={usersArr}
                chatData={chatData}
                localAudioState={audio}
                localVideoState={video}
                onAudioToggle={changeLocalAudio}
                onVideoToggle={changeLocalVideo}
                onLeaveRoom={leaveRoom}
            />
        </div>
    )
}

export default ConferencePage
