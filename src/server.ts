import 'reflect-metadata'

import express from 'express'
import routes from './routes'

import updateConfig from './config/upload'

import './database'

const app = express()

app.use(express.json())
app.use('/files', express.static(updateConfig.directory))
app.use(routes)

app.get('/', (request, response) => {
  return response.json({ msg: 'hello world' })
})

app.listen(3333, () => {
  console.log('💯 Server started on port 3333')
})
