import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { UserDto, UserDocument } from '../../dtos/users.dto'
import { UserWelcomedEvent } from '../impl/user-welcomed.event'

@EventsHandler(UserWelcomedEvent)
export class UserWelcomedHandler implements IEventHandler<UserWelcomedEvent> {
  constructor(
    @InjectModel(UserDto.name) private userModel: Model<UserDocument>
  ) {}

  async handle(event: UserWelcomedEvent): Promise<void> {
    Logger.log(event, 'UserWelcomedEvent') // Write here
    const { userId } = event
    await this.userModel.findOneAndUpdate({ userId }, { welcomed: true })
  }
}
