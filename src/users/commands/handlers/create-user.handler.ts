import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { CreateUserCommand } from '../impl/create-user.command'
import { UserRepository } from '../../repository/user.repository'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    Logger.log('Async CreateUserHandler...', 'CreateUserCommand')

    const { userDto } = command
    const user = this.publisher.mergeObjectContext(
      await this.repository.createUser(userDto)
    )
    user.commit()
  }
}
