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

// setAudio(
//     mediaStreamResponse.getAudioTracks()?.[0]?.enabled ??
//     false
// )
// setVideo(
//     mediaStreamResponse.getVideoTracks()?.[0]?.enabled ??
//     false
// )

// function changeLocalAudio() {
//     toggleAudio(streamData, !audio)
//     setAudio(!audio)
// }
// function changeLocalVideo() {
//     toggleVideo(streamData, !video)
//     setVideo(!video)
// }

function ConferencePage() {
    const navigate = useNavigate()
    const { roomId } = useParams()
    const socket = useSocket()
    const { getStreamVideoTagSize } = useStreamUser()

    const { theme } = useTheme()

    const [chatData, setChatData] = useState([])
    const [users, setUsers] = useState([])
    const [audio, setAudio] = useState(true)
    const [video, setVideo] = useState(true)

    function changeLocalAudio() {}
    function changeLocalVideo() {}
    function leaveRoom() {
        navigate(RoutePaths.main)
    }

    useEffect(() => {
        socket.onMessage(SocketEvent.GetRooms, (message) => {
            const room = message.data.find(
                (room: RoomType) => room.chatId === roomId
            )
            const chat = room.content
            const users = room.registeredUsers

            setChatData((prevData) => [...chat])
            setUsers(() => [...users.map((u: any) => u.username)])
            console.log({ chat, users })
        })

        socket.onMessage(SocketEvent.OnMessage, (message) => {
            setChatData((prevState) => [...prevState, { ...message.data }])
        })
    }, [])

    const { clients, provideMediaRef } = useWebRTC(roomId)

    return (
        <div className={cls.ConferencePage}>
            <ConferenceStreams className={cls.ConferenceContent}>
                {clients.map((clientId: string) => (
                    // <StreamUser
                    //     theme={theme}
                    //     key={s.id}
                    //     src={s}
                    //     size={getStreamVideoTagSize(streams.length)}
                    //     username={s.id}
                    // />
                    <div key={clientId}>
                        <video
                            playsInline
                            muted
                            autoPlay
                            ref={(instance) => {
                                provideMediaRef(clientId, instance)
                            }}
                        ></video>
                    </div>
                ))}
            </ConferenceStreams>
            <BottomConference
                users={users}
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
