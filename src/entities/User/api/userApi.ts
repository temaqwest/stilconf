import { axiosInstance } from '@/shared/api'
import { type User, UserPayload, CreateUserResponse } from '../model/types'

const BASE = 'users'

export default {
    getUsers: (): Promise<Array<User>> => {
        return axiosInstance.get(BASE).then((data) => data.data.data)
    },
    createUser: (payload: UserPayload): Promise<CreateUserResponse> => {
        return axiosInstance.post(BASE, payload).then((data) => data.data)
    },
    deleteUser: (id: string): Promise<void> => {
        return axiosInstance.delete(`${BASE}/${id}`)
    },
    getUser: async (id: string): Promise<User> => {
        const data = await axiosInstance.get(`${BASE}/${id}`)
        return data.data.data
    }
}
