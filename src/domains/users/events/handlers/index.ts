import { UserCreatedHandler } from './user-created.handler'
import { UserUpdatedHandler } from './user-updated.handler'
import { UserDeletedHandler } from './user-deleted.handler'
import { UserWelcomedHandler } from './user-welcomed.handler'

export const EventHandlers = [
  UserCreatedHandler,
  UserUpdatedHandler,
  UserDeletedHandler,
  UserWelcomedHandler,
]
