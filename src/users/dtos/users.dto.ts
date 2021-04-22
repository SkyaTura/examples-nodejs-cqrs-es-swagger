import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsUUID } from 'class-validator'

export class UserIdRequestParamsDto {
  @IsUUID('4')
  readonly userId!: string
}

export class UserDto {
  @ApiModelProperty()
  @IsUUID('4')
  readonly userId!: string

  @ApiModelProperty()
  @IsString()
  readonly firstName!: string

  @ApiModelProperty()
  @IsString()
  readonly lastName!: string
}
