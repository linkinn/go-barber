import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRespository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'

const appointmentsRoute = Router()

appointmentsRoute.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRespository)
  const appointments = await appointmentsRepository.find()
  return response.json(appointments)
})

appointmentsRoute.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body
    const parseDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()
    const appointment = await createAppointment.execute({provider_id, date: parseDate})

    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({message: error.message})
  }
})

export default appointmentsRoute
