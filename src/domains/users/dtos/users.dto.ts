import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export class UserIdRequestParamsDto {
  @IsUUID('4')
  readonly userId!: string
}

@Schema({ timestamps: true })
export class UserDto {
  @Prop({ unique: true })
  @ApiProperty()
  @IsUUID('4')
  readonly userId!: string

  @Prop()
  @ApiProperty()
  @IsString()
  readonly firstName!: string

  @Prop()
  @ApiProperty()
  @IsString()
  readonly lastName!: string

  @Prop({ default: false })
  @ApiProperty()
  @IsBoolean()
  readonly welcomed: boolean

  @ApiProperty()
  @IsDate()
  readonly createdAt: Date

  @ApiProperty()
  @IsDate()
  readonly updatedAt: Date
}

export class EditableUserDto extends OmitType(UserDto, [
  'userId',
  'createdAt',
  'updatedAt',
  'welcomed',
] as const) {}

export type UserDocument = UserDto & Document

export const UserSchema = SchemaFactory.createForClass(UserDto)

UserSchema.index({ userId: 1 })
