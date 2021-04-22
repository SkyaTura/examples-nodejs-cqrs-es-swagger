import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger, Injectable } from '@nestjs/common'
import { User, UserDocument } from 'users/schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserCreatedEvent } from '../impl/user-created.event'

@Injectable()
@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    Logger.log(event, 'UserCreatedEvent') // Write here
    await this.userModel.create(event.userDto)
  }
}
