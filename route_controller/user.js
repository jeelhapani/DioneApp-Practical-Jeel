const { userServices } = require("../services/index");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");



module.exports = {

    createUser: async(req, res) => {
        try {
            const req_data = req.body;
            
            const userData = await userServices.existCheck({ email: req_data.email });
            
            if (!userData) {
                req_data.password = await bcrypt.hash(req_data.password, 10);
    
                const registerUser = await userServices.createUser(req_data);
                
                return res.status(200).json({
                    status: true,
                    message: "Account create successfully.",
                    userData: registerUser
                });
            } else {
                
                return res.status(200).json({
                    status: true,
                    message: "Email already exist."
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    login: async(req, res) => {
        try {
            const req_data = req.body;

            const userData = await userServices.userData({ email: req_data.email });
            
            if (userData.length == 0) {
                return res.status(400).json({
                    status: false,
                    message: "Email not register."
                });
            }
            
            const passwordMatch = await bcrypt.compare(req_data.password, userData.password);
            if (!passwordMatch) {
                return res.status(400).json({
                    status: false,
                    message: "Password not match."
                });
            }
            
            const payload = {
                userId: userData._id,
                email: userData.email,
            }

            const token = await JWT.sign(payload, process.env.JWT_TOKEN, { expiresIn: '1d' });
            
            return res.status(200).json({
                status: true,
                message: "Login successfully.",
                token,
                userData
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }
    },

    profile: async(req, res, next) => {
        try {
            const id = req.payload.userId;
            console.log(id);
            
            const userData = await userServices.existCheck({ id: id });
            if (!userData) {
                return res.status(400).json({
                    status: false,
                    message: "User profile nor found."
                });
            }
            
            
            return res.status(200).json({
                status: true,
                message: "Profile fetch successfully.",
                userData
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