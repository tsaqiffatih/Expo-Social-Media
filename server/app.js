require('dotenv').config();
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { userTypeDefs } = require('./schema/userSchema')
const { postTypeDefs } = require('./schema/postsSchema')
const { followTypeDefs } = require('./schema/followsSchema')
const { userResolvers } = require('./resolver/userResolver')
const { postResolvers } = require('./resolver/postsResolver')
const { followsResolver } = require('./resolver/followsResolver')
const { GraphQLError } = require('graphql')
const { Code } = require('mongodb')
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

const secret = process.env.SECRET_KEY

const server = new ApolloServer({
    typeDefs: [userTypeDefs, postTypeDefs, followTypeDefs],
    resolvers: [userResolvers, postResolvers, followsResolver],
    introspection: true
})

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 3000 },
    // function yang mereturn function
    context: async ({ req }) => {
        return {
            authentication: async () => {
                const headersAuthorizations = req.headers.authorization || '';
                const token = headersAuthorizations.split(" ")[1];

                if (!token) {
                    throw new GraphQLError("Invalid Token", {
                        extensions: { Code: "NOT_AUTHORIZED" }
                    })
                }

                const decodeToken = jwt.verify(token, secret)

                if (!decodeToken) {
                    throw new GraphQLError("Invalid Token", {
                        extensions: { Code: "NOT_AUTHORIZED" }
                    })
                }

                let user = await User.getUserById(decodeToken.id)

                if (!user) {
                    throw new GraphQLError("Invalid Token", {
                        extensions: { Code: "NOT_AUTHORIZED" }
                    })
                }

                return decodeToken;
            }
        }
    }
}).then(({ url }) => {
    console.log(`server ready on port ${url}`);
}).catch(err => console.log(err));



