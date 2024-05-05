const { ObjectId } = require('mongodb');
const { database } = require('../config/mongodb');

class Posts {
  static collection() {
    return database.collection("posts");
  }

  static async creatPost(newPost) {
    return await Posts.collection().insertOne(newPost)
  }

  static async getAllPosts() {
    return await Posts.collection().aggregate([
      {
        $sort: { createdAt: -1 }
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author"
        }
      },
      { $unwind: "$author" }
    ]).toArray()
  }

  static async getPostById(postId) {
    const post = await Posts.collection().aggregate([
      { $match: { _id: new ObjectId(postId) } },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author"
        }
      },
      { $unwind: "$author" }
    ]).toArray()
    return post[0]
  }

  static async createCommentPost({ postId, content, username }) {
    const comment = {
      content,
      username,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return await Posts.collection().updateOne({ _id: new ObjectId(postId) }, { $push: { comments: comment } });
  }

  static async createLikePost({ postId, username }) {
    const post = await Posts.getPostById(postId);
    const existingLikeIndex = post.likes.findIndex(like => like.username === username);

    if (existingLikeIndex !== -1) {
      // kalo sudah like akan di remove likenya
      post.likes.splice(existingLikeIndex, 1);
    } else {
      // kalo belum like akan di remove likenya
      const like = {
        username,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      post.likes.push(like);
    }

    return await Posts.collection().updateOne({ _id: new ObjectId(postId) }, { $set: { likes: post.likes } });
  }
}

module.exports = Posts;