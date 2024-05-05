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
    author: Author
    comments: [Comment]
    likes: [Like]
    createdAt: String!
    updatedAt: String!
  }

  type Author {
    _id: ID
    name: String!
    username: String!
    email: String
  }

  type Comment {
    content: String!
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Like {
    username: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    fetchPosts: [Post]!
    fetchPostById(postId: ID!): Post
  }

  type Mutation {
    addPost(content: String!, imgurl: String,tags:[String]): Post
    addCommentPost(postId: ID!, content: String!): Post
    addLikePost(postId: ID!): Post
  }
`;

module.exports = {
  postTypeDefs
};
