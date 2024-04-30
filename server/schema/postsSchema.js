// const { gql } = require('apollo-server');
const { ObjectId } = require('mongodb');

// Define GraphQL schema for Posts
const postTypeDefs = `#graphql

  type Post {
    _id: ID!
    content: String!
    tags: [String]
    imgurl: String
    authorId: ID!
    comments: [Comment]
    likes: [Like]
    createdAt: String!
    updatedAt: String!
  }

  type Comment {
    content: String!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  type Like {
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    fetchPosts: [Post]!
    fetchPostById(postId: ID!): Post
  }

  type Mutation {
    addPost(content: String!, imgurl: String, authorId: ID!): Post
    commentPost(postId: ID!, content: String!, username: String!): Post
    likePost(postId: ID!, username: String!): Post
  }
`;



module.exports = {
  postTypeDefs
};
