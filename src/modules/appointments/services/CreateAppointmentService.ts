import { startOfHour } from 'date-fns'
import {inject, injectable} from 'tsyringe'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import AppError from '@shared/erros/AppError'

interface Request {
  provider_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
      @inject('AppointmentsRepository')
      private appointmentsRepository: IAppointmentRepository
    ) {}

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date)
    const findAppointmentinSameDate = await this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentinSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
