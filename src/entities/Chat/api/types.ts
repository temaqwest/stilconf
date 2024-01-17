export type ChatExistsResponse = {
    status: string
    data: {
        chatRegistered: boolean
    }
}

export type ChatData = {
    chatId: string
    content?: Array<ChatMessagePayload>
    createdAt: string
    registeredUsers: string
}

export type ChatMessagePayload = {
    userId: string
    username: string
    content: string
    date: string
}

export type RegisterUserInChatPayload = {
    userId: string
}
