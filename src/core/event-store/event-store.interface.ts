type GenericObject = { [key: string]: any }

export interface EventStoreMessage {
  streamId: string
  eventId: string
  eventNumber: number
  eventType: string
  created: Date
  metadata: GenericObject
  isJson: boolean
  data: GenericObject
}
