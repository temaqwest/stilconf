import React, {
    type ButtonHTMLAttributes,
    type FC,
    InputHTMLAttributes
} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppInput.module.scss'

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

const AppInput: FC<AppInputProps> = (props: AppInputProps) => {
    const { className, children, size, type = 'text', ...args } = props

    return (
        <input
            type={type}
            className={classNames(cls?.AppInput, {}, [className])}
            {...args}
        />
    )
}

export default AppInput
