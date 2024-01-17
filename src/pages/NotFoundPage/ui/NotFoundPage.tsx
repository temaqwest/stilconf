import React from 'react'
import cls from './NotFoundPage.module.scss'
import { useTranslation } from 'react-i18next'
import AppButton, {
    ButtonSize,
    ButtonTheme
} from '@/shared/ui/AppButton/AppButton'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <div className={cls.NotFound}>
            <h1 className={cls.Title}>404</h1>
            <h1 className={cls.Subtitle}>{t('notFound')}</h1>
            <AppButton
                theme={ButtonTheme.SECONDARY}
                size={ButtonSize.LARGE}
                onClick={() => navigate('/')}
            >
                {t('goBackToHome')}
            </AppButton>
        </div>
    )
}

export default NotFoundPage
