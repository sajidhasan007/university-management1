import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import handleValidationError from '../../errors/handleValidationError'
import { IGenericErrorMessage } from '../../interface/error'
import { logger } from '../../shared/looger'

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    logger.info(`i am in validation error`)
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ApiError) {
    logger.info(`i am in instance api error`)
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    logger.info(`i am in instance normal error`)
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: error?.stack,
  })

  next()
}

export default globalErrorHandler

//path:
//message:
