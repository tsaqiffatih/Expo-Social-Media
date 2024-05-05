const { ObjectId } = require("mongodb");
const Posts = require("../models/postsModel");
const User = require("../models/userModel");
const redis = require('../config/redis')


const postResolvers = {
    Query: {
        fetchPosts: async () => {
            const redisPost = await redis.get('posts');
            // console.log(JSON.parse(redisPost), "<<<<");

            if (redisPost) {
                return JSON.parse(redisPost);
            }

            const posts = await Posts.getAllPosts();
            const postIds = posts.map(post => post._id);
            // console.log(postIds);

            const postsWithUsernames = await Posts.collection().aggregate([
                { $match: { _id: { $in: postIds } } },
                {
                    $lookup: {
                        from: "users",
                        localField: "authorId",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                { $unwind: { path: "$author", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        _id: 1,
                        content: 1,
                        tags: 1,
                        imgurl: 1,
                        authorId: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        author: {
                            $cond: { if: { $eq: ["$author", null] }, then: null, else: "$author" }
                        },
                        comments: "$comments",
                        likes: "$likes"
                    }
                }
            ]).toArray();

            await redis.set('posts', JSON.stringify(postsWithUsernames));
            // await redis.del('posts')

            return postsWithUsernames;
        },
        fetchPostById: async (_, { postId }, contextValue) => {
            const auth = await contextValue.authentication()

            return await Posts.getPostById(postId);
        },
    },
    Mutation: {
        addPost: async (_, { content, tags, imgurl }, contextValue) => {
            const auth = await contextValue.authentication()

            const newPost = {
                content,
                tags,
                imgurl,
                authorId: new ObjectId(auth.id),
                comments: [],
                likes: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const post = await Posts.creatPost(newPost);
            // invalidate cache using for CUD
            await redis.del('posts')

            return await Posts.getPostById(post.insertedId)
        },
        addCommentPost: async (_, { postId, content }, contextValue) => {
            const auth = await contextValue.authentication()
            const post = await Posts.createCommentPost({
                postId,
                content,
                username: auth.username
            });
            // console.log(post);
            return await Posts.getPostById(postId)
        },
        addLikePost: async (_, { postId }, contextValue) => {
            const auth = await contextValue.authentication()
            await Posts.createLikePost({ postId, username: auth.username })

            return await Posts.getPostById(postId)
        },
    },

};


module.exports = {
    postResolvers
}