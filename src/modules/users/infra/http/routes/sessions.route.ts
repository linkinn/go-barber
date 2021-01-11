import { Router } from 'express'
import AuthenticationUserService from '@modules/users/services/AuthenticationUserService'

const sessioinsRouter = Router()

sessioinsRouter.post('/', async (request, response) => {
  const { email, password } = request.body
  const authentication = new AuthenticationUserService()

  const {user, token} = await authentication.execute({
    email,
    password
  })

  // @ts-expect-error
  delete user.password

  return response.json({user, token})
})

export default sessioinsRouter
