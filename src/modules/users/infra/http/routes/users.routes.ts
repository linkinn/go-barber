import { Router } from 'express'
import multer from 'multer'

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'

import UsersController from '../controllers/UsersController'
import UserAvatarController from '../controllers/UserAvatarController'

import uploadConfig from '@config/upload'

const userRouter = Router()
const upload = multer(uploadConfig)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

userRouter.post('/', usersController.create)
userRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)

export default userRouter
