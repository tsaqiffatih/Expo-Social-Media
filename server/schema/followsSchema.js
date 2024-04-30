// const { gql } = require('apollo-server');
const { ObjectId } = require('mongodb');

// Define GraphQL schema for Follows
const followTypeDefs = `#graphql
  type Follow {
    _id: ID!
    followingId: ID!
    followerId: ID!
    createdAt: String!
    updatedAt: String!
  }

  extend type Mutation {
    followUser(followingId: ID!, followerId: ID!): Follow
  }
`;

// Define resolvers for Follows
const resolvers = {
  Mutation: {
    followUser: async (_, { followingId, followerId }, { db }) => {
      const follow = { followingId, followerId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      const result = await db.collection('follows').insertOne(follow);
      return result.ops[0];
    },
  },
};

module.exports = {
  followTypeDefs,
  resolvers,
};
