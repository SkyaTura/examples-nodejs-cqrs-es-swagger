import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class UserIdRequestParamsDto {
  @IsUUID('4')
  readonly userId!: string
}

export class UserDto {
  @ApiProperty()
  @IsUUID('4')
  readonly userId!: string

  @ApiProperty()
  @IsString()
  readonly firstName!: string

  @ApiProperty()
  @IsString()
  readonly lastName!: string
}
