import { v4 as UUIDv4 } from 'uuid'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger'
import { UserDto, UserIdRequestParamsDto } from '../dtos/users.dto'

import { UsersService } from '../services/users.service'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* Create User */
  /*--------------------------------------------*/
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ status: 200, description: 'Create User.' })
  @Post()
  async createUser(@Body() userDto: UserDto): Promise<UserDto> {
    const userId = UUIDv4()
    return this.usersService.createUser({ ...{ userId }, ...userDto })
  }

  /* Update User */
  /*--------------------------------------------*/
  @ApiOperation({ summary: 'Update User' })
  @ApiOkResponse({ status: 200, description: 'Update User.' })
  @Put(':userId')
  async updateUser(
    @Param() userId: UserIdRequestParamsDto,
    @Body() userDto: UserDto
  ) {
    return this.usersService.updateUser({ ...userId, ...userDto })
  }

  /* Delete User */
  /*--------------------------------------------*/
  @ApiOperation({ summary: 'Delete User' })
  @ApiOkResponse({ status: 200, description: 'Delete User.' })
  @Delete(':userId')
  async deleteUser(@Param() userId: UserIdRequestParamsDto) {
    return this.usersService.deleteUser(userId)
  }

  /* TODO: List Users */
  /*--------------------------------------------*/
  @ApiOperation({ summary: 'List Users' })
  @ApiResponse({ status: 200, description: 'List Users.' })
  @Get()
  async findUsers(@Param() param) {
    return this.usersService.findUsers()
  }

  /* TODO: Find User */
  /*--------------------------------------------*/
  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 200, description: 'Get User.' })
  @Get(':userId')
  async findOneUser(@Param() userId: UserIdRequestParamsDto) {
    return this.usersService.findUsers()
  }
}
