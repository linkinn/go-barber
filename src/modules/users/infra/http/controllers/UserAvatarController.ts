import { Request, Response } from "express";
import {container} from 'tsyringe'

import UpdateAvatarUserService from '@modules/users/services/UpdateAvatarUserService'

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateAvatarUserService)

    const user = await updateUserAvatar.execute({
      userId: request.user.id,
      avatarFilename: request.file.filename
    })

    // @ts-expect-error
    delete user.password

    return response.json(user)
  }
}

export default UserAvatarController
