import { Injectable, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import { ICommand, Saga, ofType } from '@nestjs/cqrs'
import { delay, map } from 'rxjs/operators'
import { UserCreatedEvent } from '../events/impl/user-created.event'
import { WelcomeUserCommand } from '../commands/impl/welcome-user.command'

@Injectable()
export class UsersSagas {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      delay(1000),
      map((event) => {
        Logger.log('Inside [UsersSagas] Saga', 'UsersSagas')
        const { userId } = event.userDto
        return new WelcomeUserCommand(userId)
      })
    )
  }
}
