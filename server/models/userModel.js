const { ObjectId } = require('mongodb');
const { database } = require('../config/mongodb');

class User {
    static collection() {
        return database.collection("users")
    }

    static async addUser(newUser) {
        const { name, username, email, password } = newUser;
        /*
                // Check if email is unique
                const existingEmailUser = await User.collection().findOne({ email: email });
                if (existingEmailUser) {
                    throw new Error('Email is already in use');
                }
        
                // Check if username is unique
                const existingUsernameUser = await User.collection().findOne({ username: username });
                if (existingUsernameUser) {
                    throw new Error('Username is already in use');
                }
        */

        // Insert the new user if email and username are unique
        return await User.collection().insertOne(newUser);
    }


    static async loginUser(email, password) {
        const user = await User.collection().findOne({ email, password });
        return user;
    }

    static async getUserById(userId) {
        const user = await User.collection().findOne({ _id: new ObjectId(userId) });
        return user;
    }

    static async searchUsers(keyword) {
        const users = await User.collection().find({ $or: [{ name: keyword }, { username: keyword }] }).toArray();
        return users;
    }
}

module.exports = User;
