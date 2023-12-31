import { useState } from 'react'

export function useUserStream() {
	function getStream(audio: boolean, video: boolean) {
		return navigator.mediaDevices.getUserMedia({ audio, video })
	}

	function abortStream(mediaStream: MediaStream) {
		// const tracks = mediaStream.getTracks()
		// console.log(tracks)
		console.log(mediaStream)
	}

	return {
		getStream,
		abortStream
	}
}
