const userModel = require("./user.model");

module.exports = {

    existCheck: async({ email }) => {
        return new Promise( async(resolve) => {
            return resolve( await userModel.countDocuments({ email: email }) );
        });
    },
    
    createUser: async(userData) => {
        return new Promise( async(resolve) => {
            await userModel.insertOne(userData);
            return resolve( await userModel.findOne({ ...userData }) );
        });
    },
    
    userData: async({ email }) => {
        return new Promise( async(resolve) => {
            
            return resolve( await userModel.findOne({ email }) );
        });
    },

}