const User = require('../models/userModel');

// Define resolvers for User
const userResolvers = {
    Query: {
        getUserById: async (_, { userId }) => {
            const user = await User.getUserById(userId);
            return user;
            // 6630deb8d30b10698fcbe561
        },
        searchUsers: async (_, { keyword }) => {
            const users = await User.searchUsers(keyword);
            return users;
        },
    },
    Mutation: {
        registerUser: async (_, { name, username, email, password }) => {
            const newUser = { name, username, email, password };
            const result = await User.addUser(newUser);
            console.log(result);
            const dataReturn = await User.getUserById(result.insertedId)
            return dataReturn;
        },
        loginUser: async (_, { email, password }) => {
            const user = await User.loginUser(email, password);
            return user;
        },
    },
};

module.exports = {
    userResolvers
}
