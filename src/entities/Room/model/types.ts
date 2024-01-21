import { RegisteredUser } from '@/entities/User'

export type RoomType = {
    chatId: string
    content: any[]
    createdAt: string
    id: number
    registeredUsers: RegisteredUser[]
}
