import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDeletedEvent } from '../impl/user-deleted.event'
import { UserDto, UserDocument } from '../../dtos/users.dto'

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  constructor(
    @InjectModel(UserDto.name) private userModel: Model<UserDocument>
  ) {}

  async handle(event: UserDeletedEvent): Promise<void> {
    Logger.log(event, 'UserDeletedEvent') // Write here
    const { userId } = event
    await this.userModel.findOneAndDelete({ userId })
  }
}
