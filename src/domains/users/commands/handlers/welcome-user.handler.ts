import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import { Logger } from '@nestjs/common'
import { WelcomeUserCommand } from '../impl/welcome-user.command'
import { UserRepository } from '../../repository/user.repository'

@CommandHandler(WelcomeUserCommand)
export class WelcomeUserHandler implements ICommandHandler<WelcomeUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: WelcomeUserCommand): Promise<void> {
    Logger.log('Async WelcomeUserHandler...', 'WelcomeUserCommand')

    const { userId } = command
    const user = this.publisher.mergeObjectContext(
      await this.repository.welcomeUser({ userId })
    )

    user.commit()
  }
}
