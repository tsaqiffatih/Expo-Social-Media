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

  static async commentPost(postId, content, username) {
    const comment = { content,
       username, 
       createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() 
      };
      
    await Posts.collection().updateOne({ _id: ObjectId(postId) }, { $push: { comments: comment } });
    return await Posts.collection().findOne({ _id: ObjectId(postId) });
  }

  static async likePost(postId, username) {
    const like = { username, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    await Posts.collection().updateOne({ _id: ObjectId(postId) }, { $push: { likes: like } });
    return await Posts.collection().findOne({ _id: ObjectId(postId) });
  }
}

module.exports = Posts;
