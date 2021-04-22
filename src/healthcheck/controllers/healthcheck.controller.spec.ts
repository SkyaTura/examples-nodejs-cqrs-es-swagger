import { Test, TestingModule } from '@nestjs/testing'
import { HealthcheckController } from './healthcheck.controller'
import { HealthcheckService } from '../services/healthcheck.service'

describe('Healthcheck Controller', () => {
  let module: TestingModule
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [HealthcheckController],
      providers: [HealthcheckService],
    }).compile()
  })
  it('should be defined', () => {
    const controller: HealthcheckController = module.get<HealthcheckController>(
      HealthcheckController
    )
    expect(controller).toBeDefined()
  })
})
