const joi = require("joi");
const Validate = require("./joiValidate");

module.exports = {

    createUser: joi.object().keys({
        name: Validate.reqString,
        email: Validate.email,
        password: Validate.password,
    }),
    login: joi.object().keys({
        email: Validate.email,
        password: Validate.password,
    }),
    createPost: joi.object().keys({
        caption: Validate.string,
    }),
    likeIncrease: joi.object().keys({
        id: Validate.reqString,
    }),
    fetchUserPosts: joi.object().keys({
        userId: Validate.reqString,
    }),

};