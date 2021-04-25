/* eslint-disable no-await-in-loop */
import { Injectable } from '@nestjs/common'
import { EventBus } from '@nestjs/cqrs'
import { EventStore } from '../../../core/event-store/event-store'

@Injectable()
export class ServerService {
  constructor(
    private readonly eventStore: EventStore,
    private readonly event$: EventBus
  ) {
    this.event$.register()
  }

  async replayEvents(): Promise<void> {
    const events = await this.eventStore.getEvents()
    const eventHandlers = this.eventStore.getEventHandlers()
    const resultEvents = events.map(({ data, eventType }) =>
      eventHandlers[eventType](...Object.values(data))
    )

    console.log(resultEvents)
  }
}
