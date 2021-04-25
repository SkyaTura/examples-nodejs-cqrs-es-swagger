import { EventStore } from './event-store.class'

export const eventStoreProviders = [
  {
    provide: 'EVENT_STORE_PROVIDER',
    useFactory: (eventStoreConfig?: string): EventStore => {
      if (eventStoreConfig === 'EVENT_STORE_CONFIG_USE_ENV') {
        return new EventStore()
      }
      return undefined
    },
    inject: ['EVENT_STORE_CONFIG'],
  },
]
