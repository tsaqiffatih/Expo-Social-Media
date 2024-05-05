const { ObjectId } = require("mongodb");
const Follows = require("../models/followsModel");
const User = require("../models/userModel");
// followerId itu,kegiatan user lain di follow user yang sedang login
// followingId itu, kegiatan user yang sedang login memfollow user lain
const followsResolver = {
  Mutation: {
    followUser: async (_, { followingId }, contextValue) => {
      const auth = await contextValue.authentication()

      const follow = await Follows.followUser({
        followingId: new ObjectId(followingId),
        followerId: new ObjectId(auth.id)
      })

      return await Follows.getFollowFieldById(follow.insertedId)
    },
  },
};

module.exports = {
  followsResolver
}