import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { UserDeletedEvent } from '../impl/user-deleted.event'

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  handle(event: UserDeletedEvent): void {
    Logger.log(event, 'UserDeletedEvent') // Write here
  }
}
