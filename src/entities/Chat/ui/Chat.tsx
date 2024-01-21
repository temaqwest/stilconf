import React, { ReactNode, useEffect, useRef } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Chat.module.scss'
import { ChatMessagePayload } from '.././api/types'

interface ChatProps {
    className?: string
    chatData: Array<ChatMessagePayload>
    actionSlot: ReactNode
}

const ChatMessage = (props: {
    message: string
    username: string
    date: string
}) => {
    const getNormalizedDate = (responseDate: string) => {
        const d = new Date(responseDate)

        return `${d.toLocaleDateString().slice(0, 5)} ${d.toLocaleTimeString()}`
    }

    return (
        <div className={cls.ChatMessage}>
            <div className={cls.ChatAuthor}>{props.username}</div>
            <div className={cls.ChatMessageContent}>{props.message}</div>
            <span className={cls.DateTime}>
                {getNormalizedDate(props.date)}
            </span>
        </div>
    )
}

const Chat = ({ className, chatData, actionSlot }: ChatProps) => {
    const chatContainer = useRef<HTMLDivElement>()

    useEffect(() => {
        chatContainer?.current?.scrollTo({
            top: chatContainer.current.scrollHeight + 1000,
            behavior: 'smooth'
        })
    }, [chatData.length])

    return (
        <div className={classNames(cls?.Chat, {}, [className])}>
            <div className={cls.ChatContent} ref={chatContainer}>
                {chatData.map((message) => (
                    <ChatMessage
                        key={message.date}
                        message={message.content}
                        date={message.date}
                        username={message.username}
                    />
                ))}
            </div>
            {actionSlot}
        </div>
    )
}

export default Chat
