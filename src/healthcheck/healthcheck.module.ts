import { CommandBus, CqrsModule, EventBus } from '@nestjs/cqrs'
import { Module } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { HealthcheckController } from './controllers/healthcheck.controller'
import { HealthcheckService } from './services/healthcheck.service'
import { EventStoreModule } from '../core/event-store/event-store.module'
import { EventStore } from '../core/event-store/event-store'

@Module({
  imports: [CqrsModule, EventStoreModule.forFeature()],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class HealthcheckModule {
  constructor(private readonly moduleRef: ModuleRef) {}
}
