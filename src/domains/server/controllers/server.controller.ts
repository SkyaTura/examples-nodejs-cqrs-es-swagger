import { v4 as UUIDv4 } from 'uuid'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags, ApiNoContentResponse } from '@nestjs/swagger'

import { ServerService } from '../services/server.service'

@Controller('server')
@ApiTags('Server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @ApiOperation({ summary: 'Replay all events in the eventstore' })
  @ApiNoContentResponse({ status: 201, description: 'Events replayed' })
  @Post()
  async replayEvents(): Promise<void> {
    await this.serverService.replayEvents()
  }
}
