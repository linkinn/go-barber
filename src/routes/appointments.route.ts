import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRespository from '../repositories/AppointmentsRepository'

const appointmentsRoute = Router()
const appointmentsRepository = new AppointmentsRespository()

appointmentsRoute.get('/', (request, response) => {
  const appointments = appointmentsRepository.findAll()
  return response.json(appointments)
})

appointmentsRoute.post('/', (request, response) => {
  const { provider, date } = request.body

  const parseDate = startOfHour(parseISO(date))
  const findAppointmentinSameDate = appointmentsRepository.findByDate(parseDate)

  if (findAppointmentinSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' })
  }

  const appointment = appointmentsRepository.create(provider, parseDate)

  return response.json(appointment)
})

export default appointmentsRoute
