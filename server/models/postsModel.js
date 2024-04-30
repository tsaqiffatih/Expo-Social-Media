const { ObjectId } = require('mongodb');
const { database } = require('../config/mongodb');

class Posts {
  static collection() {
    return database.collection("posts");
  }

  static async creatPost(newPost) {
    return await Posts.collection().insertOne(newPost)
  }

  static async getPosts() {
    // const posts = await Posts.collection().find().toArray();
    // return posts;
    return await Posts.collection().find().toArray()
  }

  static async getPostById(postId) {
    return await Posts.collection().findOne({ _id: new ObjectId(postId) });;
  }

  static async createCommentPost(postId, content, username) {
    const comment = {
      content,
      username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return await Posts.collection().updateOne({ _id: new ObjectId(postId) }, { $push: { comments: comment } });
  }

  static async createLikePost(postId, username) {
    const like = {
      username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return await Posts.collection().updateOne({ _id: new ObjectId(postId) }, { $push: { likes: like } });
  }
}

module.exports = Posts;
