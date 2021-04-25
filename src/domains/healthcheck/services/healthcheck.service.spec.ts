import { Test, TestingModule } from '@nestjs/testing'
import { HealthcheckService } from './healthcheck.service'

describe('Healthcheck Controller', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [HealthcheckService],
    }).compile()
  })

  it('should be defined', () => {
    expect.hasAssertions()

    const services: HealthcheckService = module.get<HealthcheckService>(
      HealthcheckService
    )

    expect(services).toBeDefined()
  })

  describe('ok()', () => {
    it(`should return 'OK'`, () => {
      expect.hasAssertions()

      const services: HealthcheckService = module.get<HealthcheckService>(
        HealthcheckService
      )

      const actual = services.ok()

      expect(actual).toBe('OK')
    })
  })
})
