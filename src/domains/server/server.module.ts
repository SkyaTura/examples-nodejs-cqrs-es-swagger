import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { EventStoreModule } from '../../core/event-store/event-store.module'
import { ServerController } from './controllers/server.controller'
import { ServerService } from './services/server.service'

@Module({
  imports: [CqrsModule, EventStoreModule.forFeature()],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
