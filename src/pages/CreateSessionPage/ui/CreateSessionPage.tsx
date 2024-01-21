import React, { useState } from 'react'
import cls from './CreateSessionPage.module.scss'
import AppButton, {
    ButtonSize,
    ButtonTheme
} from '@/shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'
import AppInput, { InputSize } from '@/shared/ui/AppInput/AppInput'
import { classNames } from '@/shared/lib/classNames/classNames'
import ReportAnalysis from '@/shared/assets/reportAnalysis.svg'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import { useNavigate } from 'react-router-dom'
import { chatApi } from '@/entities/Chat'

function CreateSessionPage() {
    const { t } = useTranslation()
    const [link, setLink] = useState('')
    const navigate = useNavigate()

    async function createLink() {
        const response = await chatApi.createChat()
        setLink(response.data.chatId ?? '')
    }

    function joinRoom() {
        navigate(`/join/${link}`)
    }

    return (
        <div className={cls.CreateSessionPage}>
            <div className={cls.Column}>
                <ReportAnalysis />
            </div>
            <div className={classNames(cls.Column)}>
                <h2 className={cls.Title}>{t('createSession')}</h2>
                <p className={cls.Subtitle}>{t('createSessionDescription')}</p>
                <br />
                <div className={classNames(cls.ColumnRow)}>
                    <AppButton
                        size={ButtonSize.LARGE}
                        theme={ButtonTheme.PRIMARY}
                        onClick={createLink}
                    >
                        {t('create')}
                    </AppButton>
                    <AppInput
                        inputSize={InputSize.LARGE}
                        type={'text'}
                        className={cls.CreateField}
                        readOnly
                        placeholder={t('newlink')}
                        value={link}
                    />
                    {!!link.length && (
                        <AppButton
                            theme={ButtonTheme.FAB}
                            size={ButtonSize.LARGE}
                            className={cls.JoinButton}
                            onClick={joinRoom}
                        >
                            <AppIcon
                                name={'join'}
                                className={cls.JoinButtonIcon}
                            />
                        </AppButton>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateSessionPage
