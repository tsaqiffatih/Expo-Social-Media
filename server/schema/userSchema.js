// const { gql } = require('@apollo-server');
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

  type Query {
    getUserById(userId: ID!): User
    searchUsers(keyword: String!): [User]!
  }

  type Mutation {
    registerUser(name: String!, username: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): User
  }
`;

module.exports = {
  userTypeDefs
};
