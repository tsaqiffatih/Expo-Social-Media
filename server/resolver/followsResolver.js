// Define followsResolver for Follows
const followsResolver = {
    Mutation: {
      followUser: async (_, { followingId, followerId }, { db }) => {
        const follow = { followingId, followerId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        const result = await db.collection('follows').insertOne(follow);
        return result.ops[0];
      },
    },
  };

module.exports = {
    followsResolver
}