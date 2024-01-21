import { useCallback, useEffect, useRef } from 'react'
import useStateWithCallback from '@/shared/lib/stateWithCallback/useStateWithCallback'
import { SocketEvent, useSocket } from '@/shared/api'
import { useUserStream } from '@/widgets/PreviewStream/lib/useUserStream'
import { chatApi } from '@/entities/Chat'

const LOCAL_VIDEO = 'LOCAL_VIDEO'

export default function useWebRTC(roomId: string) {
    const [clients, updateClients] = useStateWithCallback([])

    const addNewClient = useCallback(
        (newClient, callback) => {
            if (!clients.includes(newClient)) {
                updateClients((list: any) => [...list, newClient], callback)
            }
        },
        [clients, updateClients]
    )

    const peerConnections = useRef<Record<string, any>>({})
    const localMediaStream = useRef<MediaStream>(null)
    const peerMediaElements = useRef<Record<string, any>>({
        [LOCAL_VIDEO]: null
    })

    const socket = useSocket()
    const { getStream, abortStream, startCapture, toggleAudio, toggleVideo } =
        useUserStream()

    useEffect(() => {
        async function handleNewPeer(data: {
            event: SocketEvent.AddPeer
            data: any //createOffer,peerId
        }) {
            const normalizedData: { peerId: string; createOffer: boolean } =
                Array.isArray(data.data) ? data.data[0] : data.data

            if (normalizedData.peerId in peerConnections.current) {
                return console.warn(
                    `Already connected to peer ${normalizedData.peerId}`
                )
            }

            peerConnections.current[normalizedData.peerId] =
                new RTCPeerConnection({
                    iceServers: [
                        {
                            urls: [
                                'stun:stun.l.google.com:19302',
                                'stun:stun1.l.google.com:19302'
                            ]
                        }
                    ]
                })

            peerConnections.current[normalizedData.peerId].onicecandidate = (
                event: RTCPeerConnectionIceEvent
            ) => {
                if (event.candidate) {
                    socket.sendMessage({
                        event: SocketEvent.RelayICE,
                        data: {
                            peerId: normalizedData.peerId,
                            iceCandidate: JSON.stringify(event.candidate)
                        }
                    })
                }
            }

            let tracksNumber = 0
            peerConnections.current[normalizedData.peerId].ontrack = (
                event: RTCTrackEvent
            ) => {
                const [remoteStream] = event.streams
                tracksNumber++

                if (tracksNumber === 2) {
                    // vid && audio received
                    addNewClient(normalizedData.peerId, () => {
                        peerMediaElements.current[
                            normalizedData.peerId
                        ].srcObject = remoteStream
                    })
                }
            }

            localMediaStream.current.getTracks().forEach((track) => {
                peerConnections.current[normalizedData.peerId].addTrack(
                    track,
                    localMediaStream.current
                )
            })

            if (normalizedData.createOffer) {
                const offer =
                    await peerConnections.current[
                        normalizedData.peerId
                    ].createOffer()

                await peerConnections.current[
                    normalizedData.peerId
                ].setLocalDescription(offer)

                socket.sendMessage({
                    event: SocketEvent.RelaySDP,
                    data: {
                        peerId: normalizedData.peerId,
                        sessionDescription: JSON.stringify(offer)
                    }
                })
            }
        }

        socket.onMessage(SocketEvent.AddPeer, handleNewPeer)
    }, [])

    useEffect(() => {
        async function setRemoteMedia(message: {
            event: SocketEvent.SESSION_DESCRIPTION
            data: { peerId: string; sessionDescription: string }
        }) {
            const remoteDescription = JSON.parse(
                message.data.sessionDescription
            )
            const peerId = message.data.peerId

            await peerConnections.current[peerId].setRemoteDescription(
                new RTCSessionDescription(remoteDescription)
            )

            if (remoteDescription.type === 'offer') {
                const answer =
                    await peerConnections.current[peerId].createAnswer()

                await peerConnections.current[peerId].setLocalDescription(
                    answer
                )

                socket.sendMessage({
                    event: SocketEvent.RelaySDP,
                    data: {
                        peerId,
                        sessionDescription: JSON.stringify(answer)
                    }
                })
            }
        }

        socket.onMessage(
            SocketEvent.SESSION_DESCRIPTION,
            (setRemoteMedia) => {}
        )
    }, [])

    useEffect(() => {
        socket.onMessage(
            SocketEvent.ICE_CANDIDATE,
            (message: {
                event: SocketEvent.ICE_CANDIDATE
                data: { peerId: string; iceCandidate: string }
            }) => {
                if (!message.data.iceCandidate) return

                console.log({
                    raw: message.data.iceCandidate,
                    parsed: JSON.parse(message.data.iceCandidate)
                })

                peerConnections.current[message.data.peerId].addIceCandidate(
                    new RTCIceCandidate(JSON.parse(message.data.iceCandidate))
                )
            }
        )
    }, [])

    useEffect(() => {
        function handleRemovePeer(message: {
            event: SocketEvent.RemovePeer
            data: { peerId: string }
        }) {
            if (message.data.peerId in peerConnections.current) {
                peerConnections.current[message.data.peerId].close()

                delete peerConnections.current[message.data.peerId]
                delete peerMediaElements.current[message.data.peerId]

                updateClients((list: any) =>
                    list.filter((c: any) => c !== message.data.peerId)
                )
            }
        }

        socket.onMessage(SocketEvent.RemovePeer, handleRemovePeer)
    }, [])

    useEffect(() => {
        getStream(true, true)
            .then((mediaStreamResponse) => {
                localMediaStream.current = mediaStreamResponse

                addNewClient(LOCAL_VIDEO, () => {
                    const localVideoElement =
                        peerMediaElements.current[LOCAL_VIDEO]

                    if (localVideoElement) {
                        localVideoElement.volume = 0
                        localVideoElement.srcObject = localMediaStream.current
                    }
                })
            })
            .then(async () => {
                // After capturing stream we will
                // send message to sockets to join selected room
                socket.sendMessage({
                    event: SocketEvent.Join,
                    data: {
                        userId: localStorage.getItem('userId'),
                        username: localStorage.getItem('user'),
                        bitrate: localStorage.getItem('speed'),
                        roomId: roomId
                    }
                })

                await chatApi.registerUserInChat(
                    roomId,
                    localStorage.getItem('userId'),
                    localStorage.getItem('user')
                )
            })

        return () => {
            abortStream(localMediaStream.current)
            socket.sendMessage({ event: SocketEvent.Leave, data: { roomId } })
        }
    }, [roomId])

    const provideMediaRef = useCallback((id: string, node: any) => {
        peerMediaElements.current[id] = node
    }, [])

    return {
        clients,
        provideMediaRef
    }
}
