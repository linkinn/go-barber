import { Router } from 'express'

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import AppointmentController from '../controllers/AppointmentController'

const appointmentsRoute = Router()
const appointmentController = new AppointmentController()

appointmentsRoute.use(ensureAuthenticated)

appointmentsRoute.post('/', appointmentController.create)

export default appointmentsRoute
