import { Test, TestingModule } from '@nestjs/testing'
import { ServerController } from './server.controller'
import { ServerService } from '../services/server.service'

describe('Server Controller', () => {
  let module: TestingModule
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ServerController],
      providers: [ServerService],
    }).compile()
  })
  it('should be defined', () => {
    const controller: ServerController = module.get<ServerController>(
      ServerController
    )
    expect(controller).toBeDefined()
  })
})
