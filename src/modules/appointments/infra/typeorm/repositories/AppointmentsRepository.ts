import { getRepository, Repository } from 'typeorm'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointementDTO from '@modules/appointments/dtos/ICreateAppointementDTO'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

class AppointmentsRespository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({ where: { date } })
    return findAppointment
  }

  public async create({provider_id, date}: ICreateAppointementDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({provider_id, date})
    await this.ormRepository.save(appointment)
    return appointment
  }
}

export default AppointmentsRespository
