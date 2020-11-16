import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'
import graphqlResolver from './graphql/resolvers'
import graphqlSchema from './graphql/schema'
import { api } from '../config.js'
import connect from './database'

const PORT = api.port
const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  })
})

app.use(
  '/profiles',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: false,
    customFormatErrorFn: (err) => {
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error')
      }
      const code = err.code || 500
      const message = err.message || 'An error occurred.'
      return { code, message, name: err.name }
    }
  })
)

connect()

app.listen(PORT, () => {
  console.log(`App running ${PORT}`)
})
