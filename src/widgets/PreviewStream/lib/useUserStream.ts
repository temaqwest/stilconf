type Kbps = number

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

    async function getStream({ audio, video }: MediaStreamConstraints) {
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

    function setMediaBitrates(sdp: string, bitrate: Kbps) {
        return setMediaBitrate(
            setMediaBitrate(sdp, 'video', bitrate),
            'audio',
            bitrate
        )
    }

    function setMediaBitrate(
        sdp: string,
        media: 'audio' | 'video',
        bitrate: Kbps
    ) {
        const lines = sdp.split('\n')
        let line = -1

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].indexOf('m=' + media) === 0) {
                line = i
                break
            }
        }
        if (line === -1) {
            return sdp
        }
        line++

        // Skip i and c lines
        while (
            lines[line].indexOf('i=') === 0 ||
            lines[line].indexOf('c=') === 0
        ) {
            line++
        }

        // If we're on a b line, replace it
        if (lines[line].indexOf('b') === 0) {
            lines[line] = 'b=AS:' + bitrate
            return lines.join('\n')
        }

        // Add a new b line
        let newLines = lines.slice(0, line)
        newLines.push('b=AS:' + bitrate)
        newLines = newLines.concat(lines.slice(line, lines.length))
        return newLines.join('\n')
    }

    return {
        getStream,
        abortStream,
        startCapture,
        toggleAudio,
        toggleVideo,
        setMediaBitrates
    }
}
