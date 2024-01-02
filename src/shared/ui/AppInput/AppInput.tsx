import React, { type FC, InputHTMLAttributes } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppInput.module.scss'

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    inputSize?: InputSize
}

export enum InputSize {
    LARGE = 'large',
    MEDIUM = 'medium',
    SMALL = 'small'
}

const AppInput: FC<AppInputProps> = (props: AppInputProps) => {
    const {
        className,
        children,
        type = 'text',
        inputSize = InputSize.MEDIUM,
        ...args
    } = props

    return (
        <input
            type={type}
            className={classNames(cls?.AppInput, {}, [
                className,
                cls[inputSize]
            ])}
            {...args}
        />
    )
}

export default AppInput
