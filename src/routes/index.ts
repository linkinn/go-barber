import { Router } from 'express'

import appointmentsRoute from './appointments.route'
import usersRoute from './users.routes'
import sessionsRoute from './sessions.route'

const routes = Router()

routes.use('/appointments', appointmentsRoute)
routes.use('/users', usersRoute)
routes.use('/sessions', sessionsRoute)

export default routes
