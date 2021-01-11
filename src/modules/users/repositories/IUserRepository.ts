import User from '@modules/users/infra/typeorm/entities/User'

import IcreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

interface IAppointmentRepository {
  create(data: IcreateUserDTO): Promise<User>
  save(user: User): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
  findById(id: string): Promise<User | undefined>
}

export default IAppointmentRepository
