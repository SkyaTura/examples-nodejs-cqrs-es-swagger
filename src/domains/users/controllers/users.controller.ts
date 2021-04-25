import { v4 as UUIDv4 } from 'uuid'
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'
import { UserDto, EditableUserDto, UserDocument } from '../dtos/users.dto'

import { UsersService } from '../services/users.service'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ status: 200, description: 'Create User.' })
  @Post()
  async createUser(@Body() userDto: EditableUserDto): Promise<void> {
    const userId = UUIDv4()
    await this.usersService.createUser({ ...(userDto as UserDto), userId })
  }

  @ApiOperation({ summary: 'Update User' })
  @ApiOkResponse({ status: 200, description: 'Update User.' })
  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() userDto: EditableUserDto
  ): Promise<void> {
    await this.usersService.updateUser({ ...(userDto as UserDto), userId })
  }

  @ApiOperation({ summary: 'Delete User' })
  @ApiOkResponse({ status: 200, description: 'Delete User.' })
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.usersService.deleteUser({ userId })
  }

  @ApiOperation({ summary: 'List Users' })
  @ApiResponse({ status: 200, description: 'List Users.', type: UserDto })
  @Get()
  async findUsers(): Promise<UserDocument[]> {
    return this.usersService.findUsers()
  }

  @ApiOperation({ summary: 'Get User' })
  @ApiResponse({ status: 200, description: 'Get User.', type: UserDto })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Specified user not found.',
  })
  @Get(':userId')
  async findOneUser(@Param('userId') userId: string): Promise<UserDocument> {
    const user = await this.usersService.findOneUser({ userId })
    if (!user) throw new NotFoundException()
    return user
  }
}
