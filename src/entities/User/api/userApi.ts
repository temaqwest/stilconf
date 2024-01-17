import { axiosInstance } from '@/shared/api'
import { type User, UserPayload } from './types'

const BASE = 'users'

export default {
    getUsers: (): Promise<Array<User>> => {
        return axiosInstance.get(BASE)
    },
    createUser: (payload: UserPayload): Promise<void> => {
        return axiosInstance.post(BASE, { payload })
    },
    deleteUser: (id: string): Promise<void> => {
        return axiosInstance.delete(`${BASE}/${id}`)
    }
}
