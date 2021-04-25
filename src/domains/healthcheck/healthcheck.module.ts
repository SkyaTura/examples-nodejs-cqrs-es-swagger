import { Module } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { CqrsModule } from '@nestjs/cqrs'
import { HealthcheckController } from './controllers/healthcheck.controller'
import { HealthcheckService } from './services/healthcheck.service'

@Module({
  imports: [CqrsModule],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class HealthcheckModule {
  constructor(private readonly moduleRef: ModuleRef) {}
}
