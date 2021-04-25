import { Module, OnModuleInit } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './domains/users/users.module'
import { ServerModule } from './domains/server/server.module'
import { HealthcheckModule } from './domains/healthcheck/healthcheck.module'
import { EventStoreModule } from './core/event-store/event-store.module'

@Module({
  imports: [
    EventStoreModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/admin', {
      dbName: 'ddd-nestjs',
      user: 'root',
      pass: 'example',
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
    /** ------------- */
    UsersModule,
    HealthcheckModule,
    ServerModule,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {}
}
