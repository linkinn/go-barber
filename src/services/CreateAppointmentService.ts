import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment'
import AppointmentsRespository from '../repositories/AppointmentsRepository'

interface Request {
  provider: string
  date: Date
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRespository

  constructor(appointmentsRepository: AppointmentsRespository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({provider, date}: Request): Appointment {
    const appointmentDate = startOfHour(date)
    const findAppointmentinSameDate = this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentinSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
