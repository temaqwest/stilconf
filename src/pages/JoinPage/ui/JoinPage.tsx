import React from 'react'
import { PreviewStream } from '@/widgets/PreviewStream'
import cls from '@/pages/CreateSessionPage/ui/CreateSessionPage.module.scss'
import AppButton, { ButtonTheme } from '@/shared/ui/AppButton/AppButton'
import { useTranslation } from 'react-i18next'

function JoinPage () {
	const { t } = useTranslation()

	return (
		<div className={cls.JoinPage}>
			<PreviewStream className={cls.Column}/>
			<div className={cls.Column}>
				<h2 className={cls.Title}>{t('readyToJoin')}</h2>
				<p className={cls.Subtitle}>{t('havingTroubles')}</p>
				<AppButton theme={ButtonTheme.PRIMARY}>{t('join')}</AppButton>
			</div>
		</div>
	)
}

export default JoinPage
