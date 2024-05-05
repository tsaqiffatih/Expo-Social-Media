const { ObjectId } = require('mongodb');
const { database } = require('../config/mongodb');
const { GraphQLError } = require('graphql');

class User {
    static collection() {
        return database.collection("users");
    }

    static async addUser(newUser) {
        const { name, username, email, password } = newUser;

        // Check if email is unique
        const existingEmailUser = await User.collection().findOne({ email: email });
        if (existingEmailUser) {
            throw new GraphQLError('Email already exists');
        }

        // Check if username is unique
        const existingUsernameUser = await User.collection().findOne({ username: username });
        if (existingUsernameUser) {
            throw new GraphQLError('Username already exists');
        }

        // Insert the new user if email and username are unique
        return await User.collection().insertOne(newUser);
    }


    static async loginUser(email, password) {
        const user = await User.collection().findOne({ email });

        return user;
    }

    static async getUserById(userId) {
        try {
            const user = await User.collection().findOne({ _id: new ObjectId(userId) });
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    static async getUsernameById(userId) {
        const user = await User.getUserById(userId);

        if (!user) {
            throw new GraphQLError('User not found');
        }

        return user.username
    }

    static async searchUsers(keyword) {
        const users = await User.collection().find({ $or: [{ name: keyword }, { username: keyword }] }).toArray();
        return users;
    }
}

module.exports = User;
