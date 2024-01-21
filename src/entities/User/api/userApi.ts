import { axiosInstance } from '@/shared/api'
import { type User, UserPayload, CreateUserResponse } from '../model/types'

const BASE = 'users'

export default {
    getUsers: (): Promise<Array<User>> => {
        return axiosInstance.get(BASE)
    },
    createUser: (payload: UserPayload): Promise<CreateUserResponse> => {
        return axiosInstance.post(BASE, payload).then((data) => data.data)
    },
    deleteUser: (id: string): Promise<void> => {
        return axiosInstance.delete(`${BASE}/${id}`)
    },
    getUser: (id: string): Promise<User> => {
        return axiosInstance.get(`${BASE}/${id}`).then((data) => data.data)
    }
}
