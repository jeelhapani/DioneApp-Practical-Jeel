const express = require("express");
const router = express.Router();

const Validate = require("../helper/joiCheck");
const joiSchema = require("../helper/joiSchema");
const { verifyAccessToken } = require("../helper/verify.Token");

const userController = require("../route_controller/user");

router.post(
    "/register",
    Validate.forReqBody(joiSchema.createUser),
    userController.createUser
);

router.post(
    "/login",
    Validate.forReqBody(joiSchema.login),
    userController.login
);

router.get(
    "/profile",
    verifyAccessToken,
    userController.profile
);



const postController = require("../route_controller/post");

router.post(
    "/posts",
    verifyAccessToken,
    Validate.forReqBody(joiSchema.createPost),
    postController.createPost
);

router.get(
    "/postsList",
    postController.postsList
);

router.post(
    "/posts/:id/like",
    verifyAccessToken,
    Validate.forReqBody(joiSchema.likeIncrease),
    postController.likeIncrease
);

router.get(
    "/posts/user/:userId",
    verifyAccessToken,
    Validate.forReqBody(joiSchema.fetchUserPosts),
    postController.fetchUserPosts
);


module.exports = router;