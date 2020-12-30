import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRespository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRoute = Router()
const appointmentsRepository = new AppointmentsRespository()

appointmentsRoute.get('/', (request, response) => {
  const appointments = appointmentsRepository.all()
  return response.json(appointments)
})

appointmentsRoute.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const parseDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(appointmentsRepository)

    const appointment = createAppointment.execute({provider, date: parseDate})

    return response.json(appointment)
  } catch (error) {
    return response.status(400).json({message: error.message})
  }
})

export default appointmentsRoute
