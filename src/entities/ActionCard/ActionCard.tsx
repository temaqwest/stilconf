import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ActionCard.module.scss'
import AppIcon from '@/shared/ui/AppIcon/AppIcon'
import { useNavigate } from 'react-router-dom'

interface ActionCardProps {
  className?: string
  subtitle: string
  title: string
  icon: string
  path?: string
  color?: 'purple' | 'blue' | 'green'
}

const ActionCard = (props: ActionCardProps) => {
	const { className, title, subtitle, icon, path, color } = props
	const navigate = useNavigate()

	function onClick (route: string) {
		if (route) navigate(route)
	}

	return (
		<div onClick={onClick.bind(null, path)} className={classNames(cls?.ActionCard, {}, [className, cls[color]])}>
			<AppIcon name={icon} className={cls.ActionCardIcon}/>
			<div className={cls.ActionCardText}>
				<h2 className={cls.ActionCardTitle}>{title}</h2>
				<span className={cls.ActionCardSubtitle}>{subtitle}</span>
			</div>
		</div>
	)
}

export default ActionCard
