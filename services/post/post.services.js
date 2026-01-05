const postModel = require("./post.model");

module.exports = {
    
    createPost: async(postData) => {
        return new Promise( async(resolve) => {

            await postModel.insertOne(postData);
            return resolve( await postModel.findOne({ ...postData }) );
        });
    },

    postsList: async(limit, skip) => {
        return new Promise( async(resolve) => {

            const postList = await postModel.find().skip(skip).limit(limit);
            
            return resolve(postList);
        });
    },

    likeCount: async(postId) => {
        return new Promise( async(resolve) => {
            
            const postData = await postModel.findByIdAndUpdate(
                { _id: postId },
                { $inc: { likes: 1 } },
                { new: true }
            );
            
            return resolve(postData);
        });
    },

    fetchUserPosts: async(id) => {
        return new Promise( async(resolve) => {
            
            const postData = await postModel.find(
                { userId: id }
            );
            
            return resolve(postData);
        });
    },

}