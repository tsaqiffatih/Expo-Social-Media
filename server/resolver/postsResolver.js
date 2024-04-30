// Define postResolvers for Posts
const postResolvers = {
    Query: {
        getPosts: async (_, __, { db }) => {
            const posts = await db.collection('posts').find().toArray();
            return posts;
        },
        getPostById: async (_, { postId }, { db }) => {
            const post = await db.collection('posts').findOne({ _id: ObjectId(postId) });
            return post;
        },
    },
    Mutation: {
        addPost: async (_, { content, tags, imgurl, authorId }, { db }) => {
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

            const result = await db.collection('posts').insertOne(newPost);
            return result.ops[0];
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