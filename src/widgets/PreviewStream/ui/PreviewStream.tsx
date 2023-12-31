import React, { useEffect, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './PreviewStream.module.scss'
import { ToggleMedia } from '@/features/ToggleAudio'
import { useTranslation } from 'react-i18next'
import { useUserStream } from '@/widgets/PreviewStream/lib/useUserStream'

interface PreviewStreamProps {
    className?: string
}

const PreviewStream = ({ className }: PreviewStreamProps) => {
	const { t } = useTranslation()
	const { getStream, abortStream } = useUserStream()
	const [stream, setStream] = useState<MediaStream | null>(null)

	const [audio, setAudio] = useState(true)
	const [camera, setCamera] = useState(true)

	function handleAudio() {
		setAudio(!audio)
	}

	function handleCamera() {
		setCamera(!camera)
	}

	function prepareUserMedia() {
		getStream(audio, camera).then((mediaStreamResponse: MediaStream) => {
			const video = document.getElementById('videoStream') as HTMLVideoElement

			if (mediaStreamResponse && video) {
				video.srcObject = mediaStreamResponse
				setStream(mediaStreamResponse)
			}

			console.log(stream)
		})
	}

	useEffect(() => {
		console.log('СРАБОТКА МАУНТ')
		prepareUserMedia()
	}, [audio, camera])

	useEffect(() => {
		return function() {
			abortStream(stream)
		}
	}, [])

	return (
		<div className={cls.PreviewWrapper}>
			<div className={classNames(cls?.PreviewStream, {}, [className])}>
				<video playsInline autoPlay muted id="videoStream" className={cls.PreviewStreamVideo}/>
				<div className={cls.VideoOverlay}/>
				<div className={cls.VideoActions}>
					<ToggleMedia type={'camera'} active={camera} onClick={handleCamera}/>
					<ToggleMedia type={'microphone'} active={audio} onClick={handleAudio}/>
				</div>
			</div>
			<div className={cls.MediaInfo}>
				<span className={cls.MediaText}>
					{t('camera')}: <strong>{t(camera ? 'on' : 'off')}</strong>
				</span>
				<span className={cls.MediaText}>
					{t('microphone')}: <strong>{t(audio ? 'on' : 'off')}</strong>
				</span>
			</div>
		</div>
	)
}

export default PreviewStream
