import { Inject, Injectable } from '@nestjs/common'
import { Event, TCPClient } from 'geteventstore-promise'
import { IEvent, IMessageSource, IEventPublisher } from '@nestjs/cqrs'
import { Subject } from 'rxjs'
import * as xml2js from 'xml2js'
import { HttpRequest } from '../http-request/http-request'
import { EventStore as IEventStore } from './event-store.class'
import { config } from '../../../config'

const eventStoreHostUrl = `${config.EVENT_STORE_SETTINGS.protocol}://${config.EVENT_STORE_SETTINGS.hostname}:${config.EVENT_STORE_SETTINGS.httpPort}/streams`

/**
 * @class EventStore
 * @description The EventStore.org bridge. By design, the domain category
 * (i.e. user) events are being subscribed to. Upon events being received,
 * internal event handlers are responsible for the handling of events.
 */
@Injectable()
export class EventStore implements IEventPublisher, IMessageSource {
  private eventStore: IEventStore

  private eventHandlers: { [key: string]: any }

  private category = 'users'

  private streamName: string

  constructor(@Inject('EVENT_STORE_PROVIDER') eventStore: IEventStore) {
    this.streamName = `$ce-${this.category}`
    this.eventStore = eventStore
    this.eventStore.connect({
      hostname: config.EVENT_STORE_SETTINGS.hostname,
      port: config.EVENT_STORE_SETTINGS.tcpPort,
      credentials: config.EVENT_STORE_SETTINGS.credentials,
      poolOptions: config.EVENT_STORE_SETTINGS.poolOptions,
    })
  }

  async publish<T extends IEvent>(event: T): Promise<void> {
    const message = JSON.parse(JSON.stringify(event))
    const userId = message.userId || message.userDto.userId
    const streamName = `${this.category}-${userId}`
    const type = event.constructor.name
    try {
      await this.eventStore.client.writeEvent(streamName, type, event)
    } catch (err) {
      console.trace(err)
    }
  }

  /**
   * @description Event Store bridge subscribes to domain category stream
   * @param subject
   */
  async bridgeEventsTo<T extends IEvent>(subject: Subject<T>): Promise<void> {
    const { streamName } = this

    try {
      await this.eventStore.client.subscribeToStream(
        streamName,
        async (event, payload) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          const eventUrl = `${eventStoreHostUrl}/${payload.metadata.$o}/${
            payload.data.toString().split('@')[0]
          }`
          const rawData = await HttpRequest.get(eventUrl)
          try {
            const result = await xml2js.parseStringPromise(rawData, {
              explicitArray: false,
            })
            const content = result['atom:entry']['atom:content']
            const { eventType, data } = content
            const nextEvent = this.eventHandlers[eventType](
              ...Object.values(data)
            )
            subject.next(nextEvent)
          } catch (err) {
            console.trace(err)
          }
        },
        (subscription, reason, error) => {
          console.trace(subscription, reason, error)
        },
        false
      )
    } catch (err) {
      console.trace(err)
    }
  }

  setEventHandlers(eventHandlers): void {
    this.eventHandlers = { ...this.eventHandlers, ...eventHandlers }
  }

  getEventHandlers(): { [key: string]: any } {
    return { ...this.eventHandlers }
  }

  getEvents(startPosition?: number): Promise<Event[]> {
    return this.eventStore.client.getEvents(this.streamName, startPosition)
  }

  getClient(): TCPClient {
    return this.eventStore.client
  }
}
