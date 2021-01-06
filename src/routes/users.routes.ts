import { Router } from 'express'
import multer from 'multer'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import CreateUserService from '../services/CreateUserService'
import UpdateAvatarUserService from '../services/UpdateAvatarUserService'
import uploadConfig from '../config/upload'

const userRouter = Router()
const upload = multer(uploadConfig)

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body

  const createUser = new CreateUserService()
  const user = await createUser.execute({ name, email, password })

  // @ts-expect-error
  delete user.password

  return response.json(user)
})

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
  const updateUserAvatar = new UpdateAvatarUserService()

  const user = await updateUserAvatar.execute({
    userId: request.user.id,
    avatarFilename: request.file.filename
  })

  // @ts-expect-error
  delete user.password

  return response.json(user)
})

export default userRouter
