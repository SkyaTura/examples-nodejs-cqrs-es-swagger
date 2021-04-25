import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserUpdatedEvent } from '../impl/user-updated.event'
import { UserDto, UserDocument } from '../../dtos/users.dto'

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  constructor(
    @InjectModel(UserDto.name) private userModel: Model<UserDocument>
  ) {}

  async handle(event: UserUpdatedEvent): Promise<void> {
    const { userId, ...payload } = event.userDto
    Logger.log(event, 'UserUpdatedEvent') // Write here
    await this.userModel.findOneAndUpdate({ userId }, { $set: payload })
  }
}
