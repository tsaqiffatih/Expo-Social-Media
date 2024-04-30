const { ObjectId } = require('mongodb');

class FollowsModel {
  constructor(db) {
    this.collection = db.collection('follows');
  }

  async followUser(followingId, followerId) {
    const follow = { followingId, followerId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    const result = await this.collection.insertOne(follow);
    return result.ops[0];
  }
}

module.exports = FollowsModel;
