const { GraphQLError } = require('graphql');
const User = require('../models/userModel');
const { Code, ObjectId } = require('mongodb');
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const Follows = require('../models/followsModel');

// Define resolvers for User
const userResolvers = {
    Query: {

        searchUsers: async (_, { keyword }) => {
            const users = await User.searchUsers(keyword);
            return users;

        },
        getUserById: async (_, __, contextValue) => {
            // Mendapatkan informasi user
            const auth = await contextValue.authentication()
            // console.log(userId);
            const user = await User.getUserById(auth.id);

            const followers = await Follows.getUsernameFollowers(auth.id)

            const following = await Follows.getUsernameFollowing(auth.id)
            
            return {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                followers,
                following
            };
        }
    },
    Mutation: {
        registerUser: async (_, { name, username, email, password }) => {

            const newUser = { name, username, email, password: hashPassword(password) };
            const result = await User.addUser(newUser);
            // console.log(result);
            const dataReturn = await User.getUserById(result.insertedId)
            return dataReturn;
        },
        loginUser: async (_, { email, password }) => {
            if (!email || !password) {
                throw new GraphQLError("Email and Password are required", { extensions: { Code: "NOT_AUTHORIZED" } })
            }

            const user = await User.loginUser(email, password);

            if (!user) {
                throw new GraphQLError("Invalid Email and Password", { extensions: { Code: "NOT_AUTHORIZED" } })
            }

            const chechPw = comparePassword(password, user.password)

            if (!chechPw) {
                throw new GraphQLError("Invalid Email and Password", { extensions: { Code: "NOT_AUTHORIZED" } })
            }

            const access_token = createToken({
                id: user._id,
                email: user.email,
                username: user.username
            })

            return { access_token, email: user.email };
        },
    },
};

module.exports = {
    userResolvers
}
