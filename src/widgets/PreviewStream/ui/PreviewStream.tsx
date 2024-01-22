import React, { createRef, FC, useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './PreviewStream.module.scss'
import { useTranslation } from 'react-i18next'
import { useUserStream } from '.././lib/useUserStream'
import { ToggleMedia } from '@/features/ToggleMedia'

interface PreviewStreamProps {
    className?: string
}

let streamData: null | MediaStream = null

const PreviewStream: FC<PreviewStreamProps> = ({
    className
}: PreviewStreamProps) => {
    const [audio, setAudio] = useState(true)
    const [camera, setCamera] = useState(true)
    const [isDevicesAllowedToUse, setIsDevicesAllowedToUse] = useState(true)
    const { t } = useTranslation()
    const { getStream, abortStream, startCapture } = useUserStream()

    const videoObject = createRef<HTMLVideoElement>()

    function handleAudio() {
        setAudio(!audio)
    }

    function handleCamera() {
        setCamera(!camera)
    }

    function clearTracks() {
        console.log('CLEAR: ', streamData, isDevicesAllowedToUse)
        abortStream(streamData)
    }

    useEffect(() => {
        console.log('GETTING STREAMS')
        getStream({ audio, video: camera })
            .then((mediaStreamResponse) => {
                streamData && clearTracks()
                console.log('do', {
                    mediaStreamResponse,
                    isDevicesAllowedToUse,
                    videoObject
                })
                if (mediaStreamResponse && videoObject.current) {
                    videoObject.current.srcObject = mediaStreamResponse
                    streamData = mediaStreamResponse
                    setIsDevicesAllowedToUse(true)
                    console.log({ streamData, isDevicesAllowedToUse })
                }
            })
            .catch((error) => {
                console.log({ error })
                if (error.name === 'NotAllowedError') {
                    setIsDevicesAllowedToUse(false)
                    setAudio(false)
                    setCamera(false)
                }
            })
    }, [audio, camera])

    useEffect(() => {
        return clearTracks
    }, [])

    return (
        <div className={cls.PreviewWrapper}>
            <div className={classNames(cls?.PreviewStream, {}, [className])}>
                <video
                    ref={videoObject}
                    playsInline
                    autoPlay
                    muted
                    id='videoStream'
                    className={cls.PreviewStreamVideo}
                />
                <div className={cls.VideoOverlay}>
                    {!isDevicesAllowedToUse ? (
                        <div className={cls.NotAllowedError}>
                            {t('NotAllowedError')} 🤡
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div
                    className={classNames(cls.VideoActions, {
                        [cls.VideoActionsHidden]: !isDevicesAllowedToUse
                    })}
                >
                    <ToggleMedia
                        type={'camera'}
                        active={camera}
                        onClick={handleCamera}
                    />
                    <ToggleMedia
                        type={'microphone'}
                        active={audio}
                        onClick={handleAudio}
                    />
                </div>
            </div>
            <div className={cls.MediaInfo}>
                <span className={cls.MediaText}>
                    {t('camera')}: <strong>{t(camera ? 'on' : 'off')}</strong>
                </span>
                <span className={cls.MediaText}>
                    {t('microphone')}:{' '}
                    <strong>{t(audio ? 'on' : 'off')}</strong>
                </span>
            </div>
        </div>
    )
}

export default PreviewStream
