import path from 'path'
import fs from 'fs'
import {injectable, inject} from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/erros/AppError'
import uploadConfig from '@config/upload'

interface IRequest {
  userId: string
  avatarFilename: string
}

@injectable()
class UpdateAvatarUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({userId, avatarFilename}: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId)

    if(!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if(user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if(userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await this.userRepository.save(user)

    return user
  }
}

export default UpdateAvatarUserService
