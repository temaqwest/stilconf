import { axiosInstance } from '@/shared/api'
import {
    ChatData,
    CreateChatResponse,
    ChatExistsResponse,
    ChatMessagePayload
} from '@/entities/Chat/api/types'

const BASE = 'chats'

export default {
    createChat: (): Promise<CreateChatResponse> => {
        return axiosInstance.get(`${BASE}/create`).then((data) => data.data)
    },
    isChatExists: (id: string): Promise<ChatExistsResponse> => {
        return axiosInstance
            .get(`${BASE}/check/${id}`)
            .then((data) => data.data)
    },
    getChatData: (id: string): Promise<ChatData> => {
        return axiosInstance.get(`${BASE}/${id}`)
    },
    sendMessageToChat: (
        id: string,
        payload: ChatMessagePayload
    ): Promise<void> => {
        return axiosInstance.post(`${BASE}/${id}`, payload)
    },
    registerUserInChat: (
        chatId: string,
        userId: string,
        username: string
    ): Promise<void> => {
        return axiosInstance.post(`${BASE}/register/${chatId}`, {
            userId,
            username
        })
    }
}
