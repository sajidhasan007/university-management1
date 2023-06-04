import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/looger'

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string)
    app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error('Failed to connect database', error)
  }
}
main()
