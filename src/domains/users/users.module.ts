import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs'
import { Module } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { CommandHandlers } from './commands/handlers'
import { EventHandlers } from './events/handlers'
import { UsersSagas } from './sagas/users.sagas'
import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { UserRepository } from './repository/user.repository'
import { EventStoreModule } from '../../core/event-store/event-store.module'
import { EventStore } from '../../core/event-store/event-store'
import { UserCreatedEvent } from './events/impl/user-created.event'
import { UserDeletedEvent } from './events/impl/user-deleted.event'
import { UserUpdatedEvent } from './events/impl/user-updated.event'
import { UserWelcomedEvent } from './events/impl/user-welcomed.event'
import { UserDto, UserSchema } from './dtos/users.dto'

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
    ...CommandHandlers,
    ...EventHandlers,
    UserRepository,
  ],
})
export class UsersModule {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly usersSagas: UsersSagas,
    private readonly eventStore: EventStore
  ) {}

  onModuleInit(): void {
    // This.command$.setModuleRef(this.moduleRef)
    // This.event$.setModuleRef(this.moduleRef)
    /** ------------ */
    this.eventStore.setEventHandlers(this.eventHandlers)
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$)
    this.event$.publisher = this.eventStore
    /** ------------ */
    this.event$.register()
    this.command$.register()
    // This.event$.combineSagas([this.usersSagas.userCreated])
  }

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
