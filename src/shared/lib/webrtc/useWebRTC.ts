import { useCallback, useEffect, useRef } from 'react'
import useStateWithCallback from '@/shared/lib/stateWithCallback/useStateWithCallback'
import { SocketEvent, useSocket } from '@/shared/api'
import { useUserStream } from '@/widgets/PreviewStream/lib/useUserStream'
import { chatApi } from '@/entities/Chat'
import { User } from '@/entities/User'
import { UserSpeed } from '@/entities/User/model/types'

const LOCAL_VIDEO = 'LOCAL_VIDEO'
const WIDTH_CONSTRAINTS = { min: 224, max: 480 }
const HEIGHT_CONSTRAINTS = { min: 144, max: 288 }
const ICE_SERVERS_URLS = [
    'stun:stun.l.google.com:19302',
    'stun:stun1.l.google.com:19302',
    'stun:stun2.l.google.com:19302',
    'stun:stun3.l.google.com:19302',
    'stun:stun4.l.google.com:19302',
    'stun:stun.ekiga.net',
    'stun:stun.ideasip.com',
    'stun:stun.rixtelecom.se',
    'stun:stun.schlund.de',
    'stun:stun.stunprotocol.org:3478',
    'stun:stun.voiparound.com',
    'stun:stun.voipbuster.com',
    'stun:stun.voipstunt.com',
    'stun:stun.voxgratia.org'
]

export default function useWebRTC(roomId: string) {
    const [clients, updateClients] = useStateWithCallback([])

    const addNewClient = useCallback(
        (newClient, callback) => {
            if (!clients.includes(newClient)) {
                updateClients((list: any) => [...list, newClient], callback)
            }
            console.log({ clients })
        },
        [clients, updateClients]
    )

    const peerConnections = useRef<Record<string, any>>({})
    const localMediaStream = useRef<MediaStream>(null)
    const peerMediaElements = useRef<Record<string, any>>({
        [LOCAL_VIDEO]: null
    })

    const socket = useSocket()
    const {
        getStream,
        abortStream,
        startCapture,
        toggleAudio,
        toggleVideo,
        setMediaBitrates
    } = useUserStream()

    function toggleSound(flag: boolean) {
        toggleAudio(localMediaStream.current, flag)
    }

    function toggleCamera(flag: boolean) {
        toggleVideo(localMediaStream.current, flag)
    }

    function getUserRequestedBitrate(id: string) {
        let userSpeed = UserSpeed.KB100
        const allUsers = JSON.parse(
            sessionStorage.getItem('allUsers')
        ) as User[]
        const exact = allUsers.find((user) => user.userId === id)

        if (exact?.speed) userSpeed = exact.speed

        return userSpeed === '2mb' ? 2000 : userSpeed === '500kb' ? 500 : 100
    }

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
                            urls: ICE_SERVERS_URLS
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
                            iceCandidate: event.candidate
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
                    tracksNumber = 0
                    // vid && audio received
                    addNewClient(normalizedData.peerId, () => {
                        if (peerMediaElements.current[normalizedData.peerId]) {
                            peerMediaElements.current[
                                normalizedData.peerId
                            ].srcObject = remoteStream
                        } else {
                            let settled = false
                            const interval = setInterval(() => {
                                if (
                                    peerMediaElements.current[
                                        normalizedData.peerId
                                    ]
                                ) {
                                    peerMediaElements.current[
                                        normalizedData.peerId
                                    ].srcObject = remoteStream
                                    settled = true
                                }

                                if (settled) {
                                    clearInterval(interval)
                                }
                            }, 1000)
                        }
                    })
                }
            }

            localMediaStream.current.getTracks().forEach((track) => {
                peerConnections.current[normalizedData.peerId]?.addTrack(
                    track,
                    localMediaStream.current
                )
            })

            if (normalizedData.createOffer) {
                const offer =
                    await peerConnections.current[
                        normalizedData.peerId
                    ]?.createOffer()

                await peerConnections.current[
                    normalizedData.peerId
                ].setLocalDescription(offer)

                console.log({ offer })
                offer.sdp = setMediaBitrates(
                    offer.sdp,
                    getUserRequestedBitrate(sessionStorage.getItem('userId'))
                )

                socket.sendMessage({
                    event: SocketEvent.RelaySDP,
                    data: {
                        peerId: normalizedData.peerId,
                        sessionDescription: offer
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
            console.group('setremotemedia')
            console.log('remote', { message })
            const remoteDescription = message.data.sessionDescription
            const peerId = message.data.peerId

            await peerConnections.current[peerId]?.setRemoteDescription(
                new RTCSessionDescription(remoteDescription as any)
            )

            console.log('IT IS REMOTEDESCRIPTION', remoteDescription)
            if ((remoteDescription as any).type === 'offer') {
                const answer =
                    await peerConnections.current[peerId]?.createAnswer()

                console.log('INSIDE CREATING ANSWER', {
                    peerConnections,
                    peerId,
                    answer
                })

                await peerConnections.current[peerId]?.setLocalDescription(
                    answer
                )

                console.log({ answer })
                answer.sdp = setMediaBitrates(
                    answer.sdp,
                    getUserRequestedBitrate(sessionStorage.getItem('userId'))
                )

                console.warn('ANSWER', answer)

                socket.sendMessage({
                    event: SocketEvent.RelaySDP,
                    data: {
                        peerId,
                        sessionDescription: answer
                    }
                })
            }

            console.groupEnd()
        }

        socket.onMessage(SocketEvent.SESSION_DESCRIPTION, setRemoteMedia)
    }, [])

    useEffect(() => {
        socket.onMessage(
            SocketEvent.ICE_CANDIDATE,
            (message: {
                event: SocketEvent.ICE_CANDIDATE
                data: { peerId: string; iceCandidate: string }
            }) => {
                console.log({
                    raw: message.data.iceCandidate,
                    parsed: message.data.iceCandidate,
                    peerConnections,
                    peerId: message.data.peerId
                })

                peerConnections.current[message.data.peerId]?.addIceCandidate(
                    new RTCIceCandidate(message.data.iceCandidate as any)
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
                peerConnections.current[message.data.peerId]?.close()

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
        getStream({
            audio: true,
            video: {
                width: WIDTH_CONSTRAINTS,
                height: HEIGHT_CONSTRAINTS
            }
        })
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
                        userId: sessionStorage.getItem('userId'),
                        username: sessionStorage.getItem('user'),
                        bitrate: sessionStorage.getItem('speed'),
                        roomId: roomId
                    }
                })

                await chatApi.registerUserInChat(
                    roomId,
                    sessionStorage.getItem('userId'),
                    sessionStorage.getItem('user')
                )
            })

        return () => {
            abortStream(localMediaStream.current)
            socket.sendMessage({ event: SocketEvent.Leave, data: { roomId } })
            // socket.instance.close()
        }
    }, [roomId])

    const provideMediaRef = useCallback((id: string, node: any) => {
        peerMediaElements.current[id] = node
    }, [])

    return {
        clients,
        provideMediaRef,
        toggleSound,
        toggleCamera
    }
}
