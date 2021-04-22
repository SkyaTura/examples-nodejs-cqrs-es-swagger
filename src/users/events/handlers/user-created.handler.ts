import { IEventHandler, EventsHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { UserCreatedEvent } from '../impl/user-created.event'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    Logger.log(event, 'UserCreatedEvent') // write here
  }
}
