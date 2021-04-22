import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { Logger, ValidationPipe } from '@nestjs/common'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger'
import fastifyCors from 'fastify-cors'
import { AppModule } from './app.module'
import { config } from '../config'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
    })
  )

  app.setGlobalPrefix(config.PREFIX)

  const documentOptions = new DocumentBuilder()
    .setTitle(config.TITLE)
    .setDescription(config.DESCRIPTION)
    .setVersion(config.VERSION)
    .build()
  const document = SwaggerModule.createDocument(app, documentOptions)
  const swaggerOptions: SwaggerCustomOptions = {}
  SwaggerModule.setup('docs', app, document, swaggerOptions)
  const validationOptions = {
    skipMissingProperties: true,
    validationError: { target: false },
  }
  /*--------------------------------------------*/
  app.useGlobalPipes(new ValidationPipe(validationOptions))
  app.setGlobalPrefix(config.PREFIX)
  app.register(fastifyCors, {
    origin: true,
  })
  SwaggerModule.setup(config.API_EXPLORER_PATH, app, document)
  await app.listen(config.PORT, config.HOST)
  Logger.log(`Server listening on port ${config.PORT}`, 'Bootstrap')
}

bootstrap()
