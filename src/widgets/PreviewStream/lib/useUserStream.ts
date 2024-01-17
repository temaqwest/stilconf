export function useUserStream() {
    async function startCapture(
        displayMediaOptions: DisplayMediaStreamOptions
    ) {
        let captureStream = null

        try {
            captureStream =
                await navigator.mediaDevices.getDisplayMedia(
                    displayMediaOptions
                )
        } catch (err) {
            console.error(`Error: ${err}`)
        }
        return captureStream
    }

    async function getStream(audio: boolean, video: boolean) {
        if (audio || video) {
            return navigator.mediaDevices?.getUserMedia({ audio, video })
        } else if (!navigator?.mediaDevices) {
            const error = new Error('NotAllowedError')
            error.message = 'CustomError'
            error.name = 'NotAllowedError'

            throw error
        }

        return new MediaStream()
    }

    function abortStream(mediaStream: MediaStream) {
        const tracks = mediaStream?.getTracks() ?? []
        tracks.map((track) => {
            track.stop()
            mediaStream.removeTrack(track)
        })
    }

    function toggleAudio(stream: MediaStream, flag: boolean) {
        console.log({ stream, flag })
        stream.getAudioTracks()[0].enabled = flag
    }

    function toggleVideo(stream: MediaStream, flag: boolean) {
        console.log({ stream, flag })
        stream.getVideoTracks()[0].enabled = flag
    }

    return {
        getStream,
        abortStream,
        startCapture,
        toggleAudio,
        toggleVideo
    }
}
