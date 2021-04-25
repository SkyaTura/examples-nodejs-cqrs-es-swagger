import {
  EventFactory,
  NewEvent,
  TCPClient,
  TCPConfig,
} from 'geteventstore-promise'

/**
 * @class EventStore
 * @description EventStore.org
 */
export class EventStore {
  type: 'event-store'

  client: TCPClient

  eventFactory: EventFactory

  /**
   * @constructor
   */
  constructor() {
    this.type = 'event-store'
    this.eventFactory = new EventFactory()
  }

  connect(config: TCPConfig): EventStore {
    this.client = new TCPClient(config)
    return this
  }

  getClient(): TCPClient {
    return this.client
  }

  newEvent(name: string, payload: any): NewEvent {
    return this.eventFactory.newEvent(name, payload)
  }

  close(): EventStore {
    this.client.close()
    return this
  }
}
