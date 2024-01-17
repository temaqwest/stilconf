import React, { FC } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppSideBar.module.scss'
import AppButton, { ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import { useClickOutside } from '@/shared/lib/clickOutside/clickOutside'

interface AppSideBarProps {
    className?: string
    show: boolean
    onToggle: (flag?: boolean) => void
    title: string
    activatorId?: string
}

const AppSideBar: FC<AppSideBarProps> = ({
    className,
    children,
    show,
    title,
    onToggle,
    activatorId = ''
}) => {
    const sideBarRef = useClickOutside(() => {
        console.log('Outside click')
        onToggle(false)
    }, activatorId)

    return (
        <div
            ref={sideBarRef}
            className={classNames(cls?.AppSideBar, { [cls.Show]: show }, [
                className
            ])}
        >
            <div className={cls.Header}>
                <h2 className={cls.Title}>{title}</h2>
                <AppButton
                    theme={ButtonTheme.CLEAR}
                    className={cls.Exit}
                    onClick={onToggle.bind(null, false)}
                >
                    <AppIcon name='close' />
                </AppButton>
            </div>
            {children}
        </div>
    )
}

export default AppSideBar
