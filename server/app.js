const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { userTypeDefs } = require('./schema/userSchema')
const { postTypeDefs } = require('./schema/postsSchema')
const { followTypeDefs } = require('./schema/followsSchema')
const { userResolvers } = require('./resolver/userResolver')
const { postResolvers } = require('./resolver/postsResolver')

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postResolvers],
    introspection: true
})

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 3000 }
}).then(({ url }) => {
    console.log(`server ready on port ${url}`);
}).catch(err => console.log(err));

// server.listen({ port: process.env.PORT || 3000 }).then(({ url }) => {
//     console.log(`Server ready at ${url}`)
// }).catch(error => {
//     console.error('Error starting server:', error)
// })

