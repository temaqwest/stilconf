import { axiosInstance } from '@/shared/api'
import {
    ChatData,
    ChatExistsResponse,
    ChatMessagePayload
} from '@/entities/Chat/api/types'

const BASE = 'chats'

export default {
    createChat: (): Promise<string> => {
        return axiosInstance.get(`${BASE}/create`)
    },
    isChatExists: (id: string): Promise<ChatExistsResponse> => {
        return axiosInstance.get(`${BASE}/check/${id}`)
    },
    getChatData: (id: string): Promise<ChatData> => {
        return axiosInstance.get(`${BASE}/${id}`)
    },
    sendMessageToChat: (
        id: string,
        payload: ChatMessagePayload
    ): Promise<void> => {
        return axiosInstance.post(`${BASE}/${id}`, { payload })
    },
    registerUserInChat: (chatId: string, userId: string): Promise<void> => {
        return axiosInstance.post(`${BASE}/register/${chatId}`, {
            payload: { userId }
        })
    }
}
