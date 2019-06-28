
const user = {
   _id: '1',
   name: 'oli-gra',
   email: 'oli-gra@gmail.com',
   picture: ''
}

module.exports = {
   Query: {
      me: () => user
   }
}