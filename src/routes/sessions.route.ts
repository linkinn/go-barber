import { Router } from 'express'
import AuthenticationUserService from '../services/AuthenticationUserService'

const sessioinsRouter = Router()

sessioinsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body
    const authentication = new AuthenticationUserService()

    const {user, token} = await authentication.execute({
      email,
      password
    })

    // @ts-expect-error
    delete user.password

    return response.json({user, token})
  } catch (error) {
    return response.status(400).json({message: error.message})
  }
})

export default sessioinsRouter
