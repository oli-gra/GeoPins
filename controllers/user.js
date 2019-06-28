const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.auth0)

exports.findOrCreateUser = async token => {
   // verift token
   const user = await verifyToken(token)
   // does user exist ?

   // Y - return

   // N - create
}

const verifyToken = async token => {
   try {
      const ticket = await client.verifyIdToken({
         idToken: token,
         audience: process.env.auth0
      })
      return ticket.getPayload()
   } catch (err) {
      console.error('cannot verify ' + err)
   }
}

//  const checkUserExists = async email => await User.findOne({ email }).exec() TODO: mongoose => mongodb