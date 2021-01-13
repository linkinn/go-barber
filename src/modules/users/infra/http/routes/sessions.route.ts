import { Router } from 'express'
import SessionsController from '../controllers/SessionsController'


const sessioinsRouter = Router()
const sessionsController = new SessionsController()

sessioinsRouter.post('/', sessionsController.create)

export default sessioinsRouter
