import { Injectable } from '@nestjs/common'
import { UserDto } from '../dtos/users.dto'
import { User } from '../models/user.model'

@Injectable()
export class UserRepository {
  async createUser(userDto: Partial<UserDto>): Promise<User> {
    const user = new User(undefined)
    user.setData(userDto)
    user.createUser()
    return user
  }

  async updateUser(userDto: Partial<UserDto>): Promise<User> {
    const user = new User(userDto.userId)
    user.setData(userDto)
    user.updateUser()
    return user
  }

  async deleteUser(userDto: Partial<UserDto>): Promise<User> {
    const user = new User(userDto.userId)
    user.deleteUser()
    return user
  }

  async welcomeUser(userDto: Partial<UserDto>): Promise<User> {
    const user = new User(userDto.userId)
    user.welcomeUser()
    return user
  }
}
