const JWT = require("jsonwebtoken");

module.exports = {

    verifyAccessToken: async(req, res, next) => {
        try {
            const authToken = req.headers.authorization;
            console.log(authToken);
            
            if (!authToken || !authToken.startsWith("Bearer ")) {
                return res.status(401).json({
                    status: false,
                    message: "Unauthorized Access Detected"
                });
            }
            
            const token = authToken.split(" ")[1];
            
            JWT.verify(token, process.env.JWT_TOKEN, (err, payload) => {
                if (err) {
                    return res.status(401).json({
                        status: false,
                        message: err.message
                    });
                }

                req.payload = payload;
                next();
            });

        } catch (error) {
            console.log(error);
            
            return res.status(500).json({
                status: false,
                message: "Verify token not compare"
            });
        }
    }

}