const { ObjectId } = require('mongodb');

class PostsModel {
  constructor(db) {
    this.collection = db.collection('posts');
  }

  async addPost(content, tags, imgurl, authorId) {
    const newPost = { content, tags, imgurl, authorId, comments: [], likes: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const result = await this.collection.insertOne(newPost);
    return result.ops[0];
  }

  async getPosts() {
    const posts = await this.collection.find().toArray();
    return posts;
  }

  async getPostById(postId) {
    const post = await this.collection.findOne({ _id: ObjectId(postId) });
    return post;
  }

  async commentPost(postId, content, username) {
    const comment = { content, username, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    await this.collection.updateOne({ _id: ObjectId(postId) }, { $push: { comments: comment } });
    return await this.collection.findOne({ _id: ObjectId(postId) });
  }

  async likePost(postId, username) {
    const like = { username, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    await this.collection.updateOne({ _id: ObjectId(postId) }, { $push: { likes: like } });
    return await this.collection.findOne({ _id: ObjectId(postId) });
  }
}

module.exports = PostsModel;
