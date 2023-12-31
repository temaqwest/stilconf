import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './RecentList.module.scss'
import RecentCard from '@/entities/RecentCard/RecentCard'
import { useTranslation } from 'react-i18next'

interface RecentListProps {
    className?: string
}

const RecentList = ({ className }: RecentListProps) => {
	const { t } = useTranslation()

	return (
		<div className={classNames(cls?.RecentList, {}, [className])}>
			<div className={cls.Header}>
				<h2>{t('mainRecentTitle')}</h2>
			</div>
			{
				[...new Array(20)].map((value, index, array) => (
					<RecentCard key={value} className={cls.Card}/>
				))
			}
		</div>
	)
}

export default RecentList
