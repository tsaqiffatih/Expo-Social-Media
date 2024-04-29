const { gql } = require('apollo-server');
const { ObjectId } = require('mongodb');

// Define GraphQL schema for User
const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    username: String!
    email: String!
    password: String!
  }

  extend type Query {
    getUserById(userId: ID!): User
    searchUsers(keyword: String!): [User]!
  }

  extend type Mutation {
    registerUser(name: String!, username: String!, email: String!, password: String!): User
    loginUser(username: String!, password: String!): User
  }
`;

// Define resolvers for User
const resolvers = {
  Query: {
    getUserById: async (_, { userId }, { db }) => {
      const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
      return user;
    },
    searchUsers: async (_, { keyword }, { db }) => {
      const users = await db.collection('users').find({ $or: [{ name: keyword }, { username: keyword }] }).toArray();
      return users;
    },
  },
  Mutation: {
    registerUser: async (_, { name, username, email, password }, { db }) => {
      const newUser = { name, username, email, password };
      const result = await db.collection('users').insertOne(newUser);
      return result.ops[0];
    },
    loginUser: async (_, { username, password }, { db }) => {
      const user = await db.collection('users').findOne({ username, password });
      return user;
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
