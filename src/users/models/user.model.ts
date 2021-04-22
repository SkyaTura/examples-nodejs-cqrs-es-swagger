import { AggregateRoot } from '@nestjs/cqrs'
import { UserCreatedEvent } from '../events/impl/user-created.event'
import { UserUpdatedEvent } from '../events/impl/user-updated.event'
import { UserDeletedEvent } from '../events/impl/user-deleted.event'
import { UserWelcomedEvent } from '../events/impl/user-welcomed.event'
import { UserDto } from '../dtos/users.dto'

export class User extends AggregateRoot {
  [x: string]: any

  constructor(private readonly id: string | undefined) {
    super()
  }

  setData(data): void {
    this.data = data
  }

  createUser(): void {
    this.apply(new UserCreatedEvent(this.data))
  }

  updateUser(): void {
    this.apply(new UserUpdatedEvent(this.data))
  }

  welcomeUser(): void {
    this.apply(new UserWelcomedEvent(this.id))
  }

  deleteUser(): void {
    this.apply(new UserDeletedEvent(this.id))
  }
}
