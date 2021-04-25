import dotenv from 'dotenv'
import pkg from './package.json'

// Load environment variables from .env file
dotenv.config()

export interface EnvironmentVariables {
  APP_NAME: string
  APP_TITLE: string
  APP_DESCRIPTION: string
  APP_IMAGE: string

  APP_VERSION: string
  APP_PREFIX: string
  APP_API_EXPLORER_PATH: string

  APP_HOST: string
  APP_PORT: number

  LOG_DIRECTORY: string
  LOG_FILENAME: string
  LOG_LEVEL: string

  LOGGLY_TOKEN: string
  LOGGLY_SUBDOMAIN: string

  ELASTIC_APM_SERVICE_NAME: string
  ELASTIC_APM_SECRET_TOKEN: string
  ELASTIC_APM_SERVER_URL: string

  EVENT_STORE_HOSTNAME: string
  EVENT_STORE_PORT: number
  EVENT_STORE_CREDENTIALS_USERNAME: string
  EVENT_STORE_CREDENTIALS_PASSWORD: string
}

const envDevelopmentName = 'development'
const env = process.env.NODE_ENV || envDevelopmentName
const configs = {
  base: {
    ENV: env,
    DEV: env === envDevelopmentName,
    // General
    NAME: process.env.APP_NAME || pkg.name,
    TITLE: process.env.APP_TITLE || 'Users',
    DESCRIPTION: process.env.APP_DESCRIPTION || 'Users API Microservice',
    // API
    PREFIX: process.env.APP_PREFIX || 'v1',
    VERSION: process.env.APP_VERSION || '1.0',
    API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api',
    // Server
    HOST: process.env.APP_HOST || '0.0.0.0',
    PORT: process.env.APP_PORT || 7070,
    // Event Store
    EVENT_STORE_SETTINGS: {
      protocol: process.env.EVENT_STORE_PROTOCOL || 'http',
      hostname: process.env.EVENT_STORE_HOSTNAME || '0.0.0.0',
      tcpPort: process.env.EVENT_STORE_TCP_PORT || 1113,
      httpPort: process.env.EVENT_STORE_HTTP_PORT || 2113,
      credentials: {
        username: process.env.EVENT_STORE_CREDENTIALS_USERNAME || 'admin',
        password: process.env.EVENT_STORE_CREDENTIALS_PASSWORD || 'changeit',
      },
      poolOptions: {
        min: process.env.EVENT_STORE_POOLOPTIONS_MIN || 1,
        max: process.env.EVENT_STORE_POOLOPTIONS_MAX || 10,
      },
    },
  },
  development: {},
  production: {
    PORT: process.env.APP_PORT || 7071,
  },
  test: {
    PORT: 7072,
  },
}
const config = { ...configs.base, ...configs[env] }

export { config }
