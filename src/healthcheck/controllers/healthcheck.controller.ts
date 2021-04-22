import { v4 as UUIDv4 } from 'uuid'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { HealthcheckService } from '../services/healthcheck.service'

@Controller('healthcheck')
@ApiTags('Healthcheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @ApiOperation({ summary: 'Returns a success if the server is running.' })
  @ApiOkResponse({ status: 200, description: 'Success.' })
  @Get()
  ok(): string {
    return this.healthcheckService.ok()
  }
}
