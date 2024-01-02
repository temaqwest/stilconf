import React, { useState } from 'react'
import AppButton, { ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'
import cls from './LanguageSwitcher.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { type Languages } from '@/features/LanguageSwitcher/model/types'

interface LanguageSwitcherProps {
    className?: string
}

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
    const { i18n } = useTranslation()
    const [animated, setAnimated] = useState(false)
    const [language, setLanguage] = useState<Languages>(
        i18n.language as Languages
    )

    async function changeLanguage() {
        setAnimated(true)
        await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    function onTransitionEnd() {
        setLanguage(i18n.language as Languages)
        setAnimated(false)
    }

    return (
        <AppButton
            onAnimationEnd={onTransitionEnd}
            onClick={changeLanguage}
            title='Сменить язык'
            theme={ButtonTheme.CLEAR}
            className={classNames(cls.LanguageSwitcher, {
                [cls.Animated]: animated
            })}
        >
            {language.toUpperCase()}
        </AppButton>
    )
}

export default LanguageSwitcher
