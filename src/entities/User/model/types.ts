export enum UserSpeed {
    KB100 = '100kb',
    KB500 = '500kb',
    MB2 = '2mb'
}

export type User = {
    id: number
    userId: string
    username: string
    speed: UserSpeed
    createdAt: string
}

export type RegisteredUser = {
    chatId: string
    token: string
    userId: string
}

export type CreateUserResponse = {
    status: string
    data: {
        userId: string
        username: string
        speed: UserSpeed
        createdAt: string
        id: number
    }
}

export type UserPayload = {
    username: string
    speed: UserSpeed
}
