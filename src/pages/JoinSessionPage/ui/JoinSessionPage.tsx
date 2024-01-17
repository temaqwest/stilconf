import React, { useState } from 'react'
import cls from './JoinSessionPage.module.scss'
import { PreviewStream } from '@/widgets/PreviewStream'
import AppButton, { ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import AppInput, { InputSize } from '@/shared/ui/AppInput/AppInput'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

function JoinSessionPage() {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { roomId } = useParams()
    const isRoomIdDefined = roomId !== 'join' && typeof roomId === 'string'
    const [roomInputValue, setRoomInputValue] = useState(
        isRoomIdDefined ? roomId : ''
    )
    const [roomInputVisible] = useState(!isRoomIdDefined)

    return (
        <div className={cls.JoinSessionPage}>
            <PreviewStream className={cls.Column} />
            <div className={cls.Column}>
                <h2 className={cls.Title}>{t('readyToJoin')}</h2>
                <p className={cls.Subtitle}>{t('havingTroubles')}</p>
                {roomInputVisible ? (
                    <AppInput
                        inputSize={InputSize.SMALL}
                        type={'text'}
                        placeholder={t('newlink')}
                        value={roomInputValue}
                        onChange={(e) => setRoomInputValue(e.target.value)}
                    />
                ) : (
                    <></>
                )}
                <AppButton
                    theme={ButtonTheme.PRIMARY}
                    disabled={!roomId && !roomInputValue}
                    onClick={navigate.bind(
                        null,
                        `/conference/${roomInputValue}`
                    )}
                >
                    {t('join')}
                </AppButton>
            </div>
        </div>
    )
}

export default JoinSessionPage
