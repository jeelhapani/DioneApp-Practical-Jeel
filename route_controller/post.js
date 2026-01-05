const { postServices } = require("../services/index");
const { getRedis } = require("../helper/redis.client");

const redisClient = getRedis();
const RedisUserPostsKey = "user:postsList"

module.exports = {

    createPost: async(req, res) => {
        try {
            const req_data = req.body;
            const userId = req.payload.userId;

            console.log(req_data);
            
            const postData = await postServices.createPost({ userId, ...req_data });
            
            return res.status(200).json({
                status: true,
                message: "Post create successfully.",
                postData
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    postsList: async(req, res) => {
        try {
            const limit = Number(req.query.limit) || 10;
            const skip = Number(req.query.skip) || 1;

            const postData = await postServices.postsList(limit, skip);
            
            return res.status(200).json({
                status: true,
                message: "Post list successfully.",
                postData
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    likeIncrease: async(req, res) => {
        try {
            const postId = req.params.id;
            
            const postData = await postServices.likeCount(postId);
            
            return res.status(200).json({
                status: true,
                message: "Post like increament successfully.",
                postData
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    fetchUserPosts: async(req, res) => {
        try {
            const id = req.params.userId;

            let postData = await redisClient.get(RedisUserPostsKey);
            
            if (postData) {
                postData = JSON.parse(postData);
                
            } else {
                postData = await postServices.fetchUserPosts(id);
                await redisClient.set(RedisUserPostsKey, JSON.stringify(postData), { EX: 60 });
            }
            
            return res.status(200).json({
                status: true,
                message: "User posts fetch successfully.",
                postData
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },



}