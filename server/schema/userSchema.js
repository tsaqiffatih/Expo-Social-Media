
const { ObjectId } = require('mongodb');

// Define GraphQL schema for User
const userTypeDefs = `#graphql
  type User {
    _id: ID
    name: String!
    username: String!
    email: String!
    password: String!
  }

  type UserFollow {
    name: String!
    username: String!
  }

  type UserById {
    _id: ID
    name: String!
    username: String!
    email: String!
    followers: [UserFollow]
    following: [UserFollow]
  }

  type AuthPayload{
    access_token: String!
    email: String!
  }

  type Register {
    _id: ID
    name: String!
    username: String!
    email: String!
  }

  type Query {
    getUserById: UserById
    searchUsers(keyword: String!): [User]!
  }

  type Mutation {
    registerUser(name: String!, username: String!, email: String!, password: String!): Register
    loginUser(email: String!, password: String!): AuthPayload
  }
`;

module.exports = {
  userTypeDefs
};
