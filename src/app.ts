import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.router'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1/users/', UserRoutes)

//Testing
// app.get('/', async (req: Request, res: Response) => {
//   res.send('Working Successfully')
// })
app.use(globalErrorHandler)

export default app
