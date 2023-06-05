/* eslint-disable no-undef */
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/looger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorlogger.error(error)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string)
    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('Failed to connect database', error)
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
