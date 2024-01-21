import { RegisteredUser, type User } from '@/entities/User/model/types'
import UserContainer from '@/entities/User/ui/UserContainer'
import userApi from '@/entities/User/api/userApi'

export { UserContainer, userApi }

export type { RegisteredUser, User }
