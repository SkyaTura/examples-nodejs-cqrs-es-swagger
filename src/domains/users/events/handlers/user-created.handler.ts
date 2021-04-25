import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDto, UserDocument } from '../../dtos/users.dto'
import { UserCreatedEvent } from '../impl/user-created.event'

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    @InjectModel(UserDto.name) private userModel: Model<UserDocument>
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    Logger.log(event, 'UserCreatedEvent') // Write here
    await this.userModel.create(event.userDto)
  }
}
