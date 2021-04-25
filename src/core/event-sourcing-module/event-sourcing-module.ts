/* eslint-disable @typescript-eslint/ban-types */
import { Module } from '@nestjs/common'
import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs'
import { EventStore } from 'core/event-store/event-store'
import { EventStoreModule } from 'core/event-store/event-store.module'

@Module({
  imports: [CqrsModule, EventStoreModule.forFeature()],
})
export class EventSourcingModule {
  eventHandlers: { [key: string]: Function }

  constructor(
    private readonly command$: CommandBus,
    private readonly event$: EventBus,
    private readonly eventStore: EventStore
  ) {}

  onModuleInit(): void {
    this.eventStore.setEventHandlers(this.eventHandlers)
    this.eventStore.bridgeEventsTo((this.event$ as any).subject$)
    this.event$.publisher = this.eventStore

    this.event$.register()
    this.command$.register()
  }
}
