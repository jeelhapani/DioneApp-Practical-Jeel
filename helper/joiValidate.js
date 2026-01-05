const joi = require("joi");

module.exports = {
    reqString: joi.string().required(),
    string: joi.string().allow(""),
    email: joi.string().email(),
    reqNumber: joi.number().required(),
    number: joi.number().allow(""),
    password: joi.string().min(5).message("Password length more then 5 characters").required(),
}