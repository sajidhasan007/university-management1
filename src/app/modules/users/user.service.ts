import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = (user: IUser): Promise<IUser | null> => {
  const createUser = User.create(user)
  if (!createUser) {
    throw new Error('failed to create user')
  }
  return createUser
}

export default {
  createUser,
}
