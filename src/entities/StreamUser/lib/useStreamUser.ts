import { StreamUserSize } from '@/entities/StreamUser'

export default function useStreamUser() {
    function getStreamVideoTagSize(participants: number) {
        if (participants === 1) {
            return StreamUserSize.Alone
        } else if (participants > 1 && participants < 4) {
            return StreamUserSize.L
        } else {
            return StreamUserSize.M
        }
    }

    return { getStreamVideoTagSize }
}
