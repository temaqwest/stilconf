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
            console.log(navigator)
            return navigator.mediaDevices?.getUserMedia({ audio, video })
        } else if (!navigator?.mediaDevices) {
            const error = new Error('NotAllowedError')
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

    return {
        getStream,
        abortStream,
        startCapture
    }
}
