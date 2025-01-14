import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { DeleteUserCommand } from '../impl/delete-user.command'
import { UserRepository } from '../../repository/user.repository'

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    Logger.log('Async DeleteUserHandler...', 'DeleteUserCommand')

    const { userDto } = command
    const user = this.publisher.mergeObjectContext(
      await this.repository.deleteUser(userDto)
    )

    user.commit()
  }
}
