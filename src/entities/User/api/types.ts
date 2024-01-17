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

export type UserPayload = {
    username: string
    speed: UserSpeed
}
