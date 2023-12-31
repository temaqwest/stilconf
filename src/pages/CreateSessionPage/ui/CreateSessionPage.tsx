import React from 'react'
import cls from './CreateSessionPage.module.scss'
import { PreviewStream } from '@/widgets/PreviewStream'
import { useTranslation } from 'react-i18next'
import AppButton, { ButtonTheme } from '@/shared/ui/AppButton/AppButton'

function CreateSessionPage () {
	const { t } = useTranslation()

	return (
		<div className={cls.CreateSession}>
			<PreviewStream className={cls.Column}/>
			<div className={cls.Column}>
				<h2 className={cls.Title}>{t('readyToJoin')}</h2>
				<p className={cls.Subtitle}>{t('havingTroubles')}</p>
				<AppButton theme={ButtonTheme.PRIMARY}>{t('join')}</AppButton>
			</div>
		</div>
	)
}

export default CreateSessionPage
