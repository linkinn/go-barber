import { hash } from 'bcryptjs'
import {injectable, inject} from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/erros/AppError'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExist = await this.userRepository.findByEmail(email)

    if (checkUserExist) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await hash(password, 8)

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService
