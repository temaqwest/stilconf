import React, { createRef, useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StreamUser.module.scss'
import { StreamUserSize } from '@/entities/StreamUser'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import { Theme } from '@/app/providers/ThemeProvider'

interface StreamUserProps {
    className?: string
    size?: StreamUserSize
    username: string
    theme?: Theme
    src: MediaStream
}

const StreamUser = ({
    className,
    size = StreamUserSize.M,
    username,
    theme,
    src
}: StreamUserProps) => {
    const [isSpeaking, setIsSpeaking] = useState(false)
    const streamRef = createRef<HTMLVideoElement>()

    function speak() {
        setIsSpeaking(!isSpeaking)
    }

    useEffect(() => {
        streamRef.current.srcObject = src
    }, [])

    return (
        <div
            // onMouseEnter={speak}
            className={classNames(
                cls?.StreamUser,
                { [cls.Speaking]: isSpeaking },
                [className, cls[size], cls[theme]]
            )}
        >
            <video
                ref={streamRef}
                className={cls.StreamUserVideo}
                autoPlay
                playsInline
                muted
            />
            <div className={cls.StreamUserBottom}>
                <span className={cls.Username}>{username}</span>
                <AppIcon
                    className={classNames(
                        cls.Microphone,
                        { [cls.MicrophoneSpeaking]: isSpeaking },
                        []
                    )}
                    name={'microphone'}
                />
            </div>
        </div>
    )
}

export default StreamUser
