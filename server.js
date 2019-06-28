const { ApolloServer } = require('apollo-server')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

// Load mongo using native drivers
const client = new MongoClient(process.env.mongoUri, { useNewUrlParser: true })
client.connect(err => err ? console.log(err) : console.log('db OK'))

//config apollo
const { findOrCreateUser } = require('./controllers/user')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: async ({ req }) => {
      let authToken = null
      try {
         authToken = req.headers.authorization
         if (authToken) {
            await findOrCreateUser(authToken)
         }
      } catch (err) {
         console.error('no auth ' + err)
      }
   }
})

server.listen().then(({ url }) => console.log(url))