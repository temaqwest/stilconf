import React, { FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ConferenceStreams.module.scss'

interface ConferenceStreamsProps {
    className?: string
}

const ConferenceStreams: FC<ConferenceStreamsProps> = ({
    className,
    children
}) => {
    return (
        <div className={classNames(cls?.ConferenceStreams, {}, [className])}>
            {children}
        </div>
    )
}

export default ConferenceStreams
