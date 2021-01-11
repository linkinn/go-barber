import { Router } from 'express'
import { parseISO } from 'date-fns'

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'
import AppointmentsRespository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

const appointmentsRoute = Router()

appointmentsRoute.use(ensureAuthenticated)

// appointmentsRoute.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRespository)
//   const appointments = await appointmentsRepository.find()
//   return response.json(appointments)
// })

appointmentsRoute.post('/', async (request, response) => {
  const { provider_id, date } = request.body
  const parseDate = parseISO(date)
  const appointmentsRepository = new AppointmentsRespository()

  const createAppointment = new CreateAppointmentService(appointmentsRepository)
  const appointment = await createAppointment.execute({provider_id, date: parseDate})

  return response.json(appointment)
})

export default appointmentsRoute
