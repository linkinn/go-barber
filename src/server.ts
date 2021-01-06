import 'reflect-metadata'

import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import routes from './routes'

import updateConfig from './config/upload'

import './database'
import AppError from './erros/AppError'

const app = express()

app.use(express.json())
app.use('/files', express.static(updateConfig.directory))
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.get('/', (request, response) => {
  return response.json({ msg: 'hello world' })
})

app.listen(3333, () => {
  console.log('💯 Server started on port 3333')
})
