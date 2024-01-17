import React, { useEffect, useState } from 'react'
import cls from './ConferencePage.module.scss'
import { ConferenceStreams } from '@/widgets/ConferenceStreams'
import AppButton, { ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { StreamUser } from '@/entities/StreamUser'
import useStreamUser from '@/entities/StreamUser/lib/useStreamUser'
import { useTheme } from '@/app/providers/ThemeProvider'
import { BottomConference } from '@/widgets/BottomConference'
import { useUserStream } from '@/widgets/PreviewStream/lib/useUserStream'
import { useParams } from 'react-router-dom'

let streamData: null | MediaStream = null

function ConferencePage() {
    const { roomId } = useParams()
    console.log(roomId)

    const { getStreamVideoTagSize } = useStreamUser()
    const { theme } = useTheme()
    const [streams, setStreams] = useState([])

    const [audio, setAudio] = useState(true)
    const [video, setVideo] = useState(true)
    const { getStream, abortStream, startCapture, toggleAudio, toggleVideo } =
        useUserStream()

    function changeLocalAudio() {
        toggleAudio(streamData, !audio)
        setAudio(!audio)
    }
    function changeLocalVideo() {
        toggleVideo(streamData, !video)
        setVideo(!video)
    }

    useEffect(() => {
        getStream(audio, video)
            .then((mediaStreamResponse) => {
                if (mediaStreamResponse) {
                    streamData = mediaStreamResponse

                    addStream(mediaStreamResponse)
                    setAudio(
                        mediaStreamResponse.getAudioTracks()?.[0]?.enabled ??
                            false
                    )
                    setVideo(
                        mediaStreamResponse.getVideoTracks()?.[0]?.enabled ??
                            false
                    )
                }
            })
            .catch((error) => {
                console.log({ error })
            })
    }, [])

    function addStream(stream: MediaStream) {
        setStreams((previousValue) => [...previousValue, stream])
    }

    return (
        <div className={cls.ConferencePage}>
            {/* TopConferenceSettings */}
            <AppButton
                className={cls.ConferenceHeader}
                onClick={addStream.bind(null, new MediaStream())}
                theme={ButtonTheme.SECONDARY}
            >
                Add +
            </AppButton>
            <ConferenceStreams className={cls.ConferenceContent}>
                {streams.map((s) => (
                    <StreamUser
                        theme={theme}
                        key={s.id}
                        src={s}
                        size={getStreamVideoTagSize(streams.length)}
                        username={s.id}
                    />
                ))}
            </ConferenceStreams>
            <BottomConference
                localAudioState={audio}
                localVideoState={video}
                onAudioToggle={changeLocalAudio}
                onVideoToggle={changeLocalVideo}
            />
        </div>
    )
}

export default ConferencePage
