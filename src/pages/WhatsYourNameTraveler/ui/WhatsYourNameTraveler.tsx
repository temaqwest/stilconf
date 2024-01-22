import React, { useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './WhatsYourNameTraveler.module.scss'
import { useTranslation } from 'react-i18next'
import AppInput, { InputSize } from '@/shared/ui/AppInput/AppInput'
import AppButton, { ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from '@/shared/config/routeConfig/routeConfig'
import userApi from '@/entities/User/api/userApi'
import { UserSpeed } from '@/entities/User/model/types'

interface WhatsYourNameTravelerProps {
    className?: string
}

const WhatsYourNameTraveler = ({ className }: WhatsYourNameTravelerProps) => {
    const { t } = useTranslation()
    const [name, setName] = useState('')
    const [speed, setSpeedValue] = useState('' as UserSpeed)
    const navigate = useNavigate()

    async function saveUser() {
        try {
            const newUser = await userApi.createUser({
                username: name,
                speed: speed
            })

            console.log({ newUser })

            sessionStorage.setItem('user', newUser.data.username)
            sessionStorage.setItem('userId', newUser.data.userId)
            sessionStorage.setItem('speed', newUser.data.speed)

            navigate(RoutePaths.main)
        } catch (e) {
            console.log('Ошибка создания пользователя', e)
        }
    }

    function setSpeed(e: any) {
        setSpeedValue(e.target.value as UserSpeed)
    }

    return (
        <div
            className={classNames(cls?.WhatsYourNameTraveler, {}, [className])}
        >
            <h1 className={cls.Title}>{t('hello')}</h1>
            <h2 className={cls.YourName}>{t('WhatIsYourName')}</h2>
            <div className={cls.Form}>
                <AppInput
                    className={cls.Input}
                    inputSize={InputSize.MEDIUM}
                    type={'text'}
                    placeholder={t('WhatIsYourNameInputPlaceholder')}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className={cls.SpeedContainer}>
                    <label className={cls.RadioContainer}>
                        100kbps
                        <input
                            className={cls.Radio}
                            type='radio'
                            value={UserSpeed.KB100}
                            name={'speed'}
                            onChange={setSpeed}
                        />
                    </label>
                    <label className={cls.RadioContainer}>
                        500kbps
                        <input
                            className={cls.Radio}
                            type='radio'
                            value={UserSpeed.KB500}
                            name={'speed'}
                            onChange={setSpeed}
                        />
                    </label>
                    <label className={cls.RadioContainer}>
                        2mbps
                        <input
                            className={cls.Radio}
                            type='radio'
                            value={UserSpeed.MB2}
                            name={'speed'}
                            onChange={setSpeed}
                        />
                    </label>
                </div>
                <AppButton
                    className={cls.Save}
                    theme={ButtonTheme.SECONDARY}
                    disabled={!name.length || !speed}
                    onClick={saveUser}
                >
                    {t('Save')}
                </AppButton>
            </div>
        </div>
    )
}

export default WhatsYourNameTraveler
