import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { UserUpdatedEvent } from '../impl/user-updated.event'

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  handle(event: UserUpdatedEvent): void {
    Logger.log(event, 'UserUpdatedEvent') // Write here
  }
}
