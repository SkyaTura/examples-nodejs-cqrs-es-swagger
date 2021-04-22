import { Module, OnModuleInit } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { HealthcheckModule } from './healthcheck/healthcheck.module'
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
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {}
}
