import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import ICreateAppointementDTO from '@modules/appointments/dtos/ICreateAppointementDTO'

interface IAppointmentRepository {
  create(data: ICreateAppointementDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}

export default IAppointmentRepository
