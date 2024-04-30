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
        addCommentPost: async (_, { postId, content, username }) => {
            const post = await Posts.createCommentPost(postId, content, username);
            // console.log(post);
            
            return await Posts.getPostById(postId)
        },
        addLikePost: async (_, { postId, username }) => {
            await Posts.createLikePost(postId,username)

            return await Posts.getPostById(postId)
        },
    },

};


module.exports = {
    postResolvers
}