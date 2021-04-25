import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  UserDto,
  UserIdRequestParamsDto,
  UserDocument,
} from '../dtos/users.dto'
import { CreateUserCommand } from '../commands/impl/create-user.command'
import { UpdateUserCommand } from '../commands/impl/update-user.command'
import { DeleteUserCommand } from '../commands/impl/delete-user.command'

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    @InjectModel(UserDto.name) private userModel: Model<UserDocument>
  ) {}

  createUser(user: UserDto): Promise<UserDto> {
    return this.commandBus.execute(new CreateUserCommand(user))
  }

  updateUser(user: UserDto): Promise<UserDto> {
    return this.commandBus.execute(new UpdateUserCommand(user))
  }

  deleteUser(user: UserIdRequestParamsDto): Promise<void> {
    return this.commandBus.execute(new DeleteUserCommand(user))
  }

  async findUsers(): Promise<UserDocument[]> {
    return await this.userModel.find().lean()
  }

  async findOneUser(user: UserIdRequestParamsDto): Promise<UserDocument> {
    const { userId } = user
    return await this.userModel.findOne({ userId }).lean()
  }
}
