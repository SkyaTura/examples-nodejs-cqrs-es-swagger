import { CqrsModule } from '@nestjs/cqrs'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { EventSourcingModule } from '../../core/event-sourcing-module/event-sourcing-module'
import { UsersController } from './controllers/users.controller'
import { EventStoreModule } from '../../core/event-store/event-store.module'

import { UsersSagas } from './sagas/users.sagas'
import { UsersService } from './services/users.service'
import { UserRepository } from './repository/user.repository'
import { UserDto, UserSchema } from './dtos/users.dto'
import { CommandHandlers } from './commands/handlers'
import { EventHandlers } from './events/handlers'

import { UserCreatedEvent } from './events/impl/user-created.event'
import { UserDeletedEvent } from './events/impl/user-deleted.event'
import { UserUpdatedEvent } from './events/impl/user-updated.event'
import { UserWelcomedEvent } from './events/impl/user-welcomed.event'

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.forFeature(),
    MongooseModule.forFeature([{ name: UserDto.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersSagas,
    UserRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class UsersModule extends EventSourcingModule {
  eventHandlers = {
    UserCreatedEvent: (userData: UserDto): UserCreatedEvent =>
      new UserCreatedEvent(userData),
    UserDeletedEvent: (userId: string): UserDeletedEvent =>
      new UserDeletedEvent(userId),
    UserUpdatedEvent: (userData: UserDto): UserUpdatedEvent =>
      new UserUpdatedEvent(userData),
    UserWelcomedEvent: (userId: string): UserWelcomedEvent =>
      new UserWelcomedEvent(userId),
  }
}
