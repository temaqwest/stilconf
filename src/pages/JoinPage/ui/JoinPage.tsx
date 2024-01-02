import React, { useState } from 'react'
import cls from './JoinPage.module.scss'
import AppButton, {
    ButtonSize,
    ButtonTheme
} from '@/shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'
import AppInput, { InputSize } from '@/shared/ui/AppInput/AppInput'
import { classNames } from '@/shared/lib/classNames/classNames'
import ReportAnalysis from '@/shared/assets/reportAnalysis.svg'
import { randomString } from '@/shared/lib/randomString/randomString'

function JoinPage() {
    const { t } = useTranslation()
    const [link, setLink] = useState('')

    function createLink() {
        setLink(randomString())
    }

    return (
        <div className={cls.JoinPage}>
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
                </div>
            </div>
        </div>
    )
}

export default JoinPage
