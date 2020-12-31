import { Router } from 'express'
import AuthenticationUserService from '../services/AuthenticationUserService'

const sessioinsRouter = Router()

sessioinsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body
    const authentication = new AuthenticationUserService()

    const {user} = await authentication.execute({
      email,
      password
    })

    return response.json({user})
  } catch (error) {
    return response.status(400).json({message: error.message})
  }
})

export default sessioinsRouter
