import { Request, Response } from "express";
import {container} from 'tsyringe'

import AuthenticationUserService from '@modules/users/services/AuthenticationUserService'

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const authentication = container.resolve(AuthenticationUserService)

    const {user, token} = await authentication.execute({
      email,
      password
    })

    // @ts-expect-error
    delete user.password

    return response.json({user, token})
  }
}

export default SessionsController
