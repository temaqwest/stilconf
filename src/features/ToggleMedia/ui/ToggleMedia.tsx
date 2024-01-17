import React, { FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ToggleMedia.module.scss'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'

interface ToggleMediaProps {
    className?: string
    active: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    type: 'microphone' | 'camera'
}

const ToggleMedia: FC<ToggleMediaProps> = ({
    className,
    active,
    type,
    ...args
}: ToggleMediaProps) => {
    return (
        <button
            className={classNames(cls?.ToggleMedia, { [cls.Off]: !active }, [
                className
            ])}
            {...args}
        >
            <AppIcon name={type} className={cls.ToggleMediaIcon} />
        </button>
    )
}

export default ToggleMedia
