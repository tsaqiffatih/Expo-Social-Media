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

  type Mutation {
    followUser(followingId: ID!, followerId: ID!): Follow
  }
`;


module.exports = {
  followTypeDefs
};
