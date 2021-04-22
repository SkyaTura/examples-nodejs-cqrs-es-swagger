import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class User {
  @Prop()
  userId: string

  @Prop()
  firstName: string

  @Prop()
  lastName: string
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.index({ userId: 1 })
