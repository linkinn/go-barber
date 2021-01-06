import { Router } from 'express'
import { parseISO } from 'date-fns'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import AppointmentsRespository from '../repositories/AppointmentsRepository'

import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'

const appointmentsRoute = Router()

appointmentsRoute.use(ensureAuthenticated)

appointmentsRoute.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRespository)
  const appointments = await appointmentsRepository.find()
  return response.json(appointments)
})

appointmentsRoute.post('/', async (request, response) => {
  const { provider_id, date } = request.body
  const parseDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()
  const appointment = await createAppointment.execute({provider_id, date: parseDate})

  return response.json(appointment)
})

export default appointmentsRoute
