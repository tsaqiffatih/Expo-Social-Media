const { ObjectId } = require('mongodb');
const { database } = require('../config/mongodb');
const { GraphQLError } = require('graphql');
const User = require('./userModel');
// 1. find semuan follow dengan followerId yang sama dengan userId
// 2. setelah ketemu, map data nya. keluarin followingId nya
// 3. bandingin dengan followerId nya, kalo sama. user berarti udah follow

class Follows {
  static collection(db) {
    return database.collection("follows")
  }

  static async followUser({ followingId, followerId }) {

    if (followerId === followingId) {
      throw new GraphQLError("You was follow this user")
    }

    const follow = {
      followingId,
      followerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const result = await Follows.collection().insertOne(follow);
    // console.log(result);
    return result
  }

  static async getFollowFieldById(userId) {
    return await Follows.collection().findOne({ _id: new ObjectId(userId) })
  }

  static async getAllFollow() {
    return await Follows.collection().find().toArray()
  }

  static async getFollowers(userId) {
    const followers = await Follows.collection().find({ followingId: new ObjectId(userId) }).toArray();

    const followersId = followers.map((follow) => {
      return follow.followerId
    })

    return followersId;
  }
  
  static async getFollowing(userId) {
    const following = await Follows.collection().find({ followerId: new ObjectId(userId) }).toArray();

    const followingsId = following.map((follow) => {
      return follow.followingId
    })

    return followingsId;
  }

  static async getUsernameFollowers(userId) {
    const followersId = await Follows.getFollowers(userId);

    const followers = await User.collection().find({ _id: { $in: followersId } }, { username: 1 }).toArray();

    return followers;
  }

  static async getUsernameFollowing(userId) {
    const followingId = await Follows.getFollowing(userId);

    const following = await User.collection().find({ _id: { $in: followingId } }, { username: 1 }).toArray();

    return following;
  }

}

module.exports = Follows;
