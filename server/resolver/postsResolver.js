const Posts = require("../models/postsModel");

// Define postResolvers for Posts
const postResolvers = {
    Query: {
        fetchPosts: async () => {
            const posts = await Posts.getPosts()
            // console.log(posts);
            return posts;
        },
        fetchPostById: async (_, { postId }) => {
            return await Posts.getPostById(postId);
        },
    },
    Mutation: {
        addPost: async (_, { content, tags, imgurl, authorId }) => {
            const newPost = {
                content,
                tags,
                imgurl,
                authorId,
                comments: [],
                likes: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const post = await Posts.creatPost(newPost);
            return await Posts.getPostById(post.insertedId)
        },
        commentPost: async (_, { postId, content, username }, { db }) => {
            const comment = {
                content,
                username,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await db.collection('posts').updateOne({ _id: ObjectId(postId) }, { $push: { comments: comment } });

            return await db.collection('posts').findOne({ _id: ObjectId(postId) });
        },
        likePost: async (_, { postId, username }, { db }) => {
            const like = {
                username,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await db.collection('posts').updateOne({ _id: ObjectId(postId) }, { $push: { likes: like } });

            return await db.collection('posts').findOne({ _id: ObjectId(postId) });
        },
    },

};


module.exports = {
    postResolvers
}