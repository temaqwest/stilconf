import React, { useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ChatInput.module.scss'
import AppButton, { ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import { Theme } from '@/app/providers/ThemeProvider'
import emoji from '@/shared/assets/emoji'
import {
    KeyupShortkeys,
    useKeyupHandler
} from '@/shared/lib/keyupHandler/keyupHandler'
import { useClickOutside } from '@/shared/lib/clickOutside/clickOutside'

interface ChatInputProps {
    className?: string
    theme?: Theme
    value: string
    sendMessage: (val: string) => void
}

const ChatInput = ({
    className,
    theme = Theme.LIGHT,
    sendMessage,
    value
}: ChatInputProps) => {
    const [emojiShow, setEmojiShow] = useState(false)
    const [innerValue, setInnerValue] = useState(value)
    const { createKeyupHandler } = useKeyupHandler()
    const emojiRef = useClickOutside(() => {
        setEmojiShow(false)
    }, 'emojiActivator')

    const handleSendByEnterKey = createKeyupHandler(
        KeyupShortkeys.Enter,
        onSendClick
    )

    function onSendClick() {
        if (innerValue.length) {
            sendMessage(innerValue)
            setInnerValue('')
        }
    }

    return (
        <div
            className={classNames(cls?.ChatInputWrapper, {}, [
                className,
                cls[theme]
            ])}
        >
            <input
                onKeyUp={handleSendByEnterKey}
                maxLength={200}
                type='text'
                className={cls.ChatInput}
                value={innerValue}
                onChange={(e) => setInnerValue(e.target.value)}
            />
            <AppButton
                className={cls.ActionButton}
                theme={ButtonTheme.CLEAR}
                id='emojiActivator'
                onClick={setEmojiShow.bind(null, !emojiShow)}
            >
                <AppIcon className={cls.ActionIcon} name={'emoji'} />
            </AppButton>
            <AppButton
                className={cls.ActionButton}
                theme={ButtonTheme.CLEAR}
                onClick={onSendClick}
                disabled={!innerValue.length}
            >
                <AppIcon className={cls.ActionIcon} name={'send'} />
            </AppButton>
            <div
                ref={emojiRef}
                className={classNames(
                    cls.ChatEmojiContainer,
                    { [cls.ShowEmoji]: emojiShow },
                    []
                )}
            >
                {emoji.map((e) => (
                    <span
                        key={e}
                        onClick={setInnerValue.bind(
                            null,
                            (prev: string) => prev + String.fromCodePoint(e)
                        )}
                    >
                        {String.fromCodePoint(e)}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default ChatInput
