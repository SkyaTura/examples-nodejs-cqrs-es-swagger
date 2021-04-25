import { Module } from '@nestjs/common'
import { HealthcheckController } from './controllers/healthcheck.controller'
import { HealthcheckService } from './services/healthcheck.service'

@Module({
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class HealthcheckModule {}
