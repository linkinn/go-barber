import { Router } from 'express'

import appointmentsRoute from '@modules/appointments/infra/http/routes/appointments.route'
import usersRoute from '@modules/users/infra/http/routes/users.routes'
import sessionsRoute from '@modules/users/infra/http/routes/sessions.route'

const routes = Router()

routes.use('/appointments', appointmentsRoute)
routes.use('/users', usersRoute)
routes.use('/sessions', sessionsRoute)

export default routes
