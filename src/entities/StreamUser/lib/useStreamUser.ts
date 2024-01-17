import { StreamUserSize } from '@/entities/StreamUser'

export default function useStreamUser() {
    function getStreamVideoTagSize(participants: number) {
        return participants <= 3
            ? StreamUserSize.L
            : participants <= 9
              ? StreamUserSize.M
              : StreamUserSize.S
    }

    return { getStreamVideoTagSize }
}
