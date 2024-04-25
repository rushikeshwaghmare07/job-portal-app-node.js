const JWT = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            throw new Error("Authentication Failed: No Bearer token provided");
        }
        const token = authHeader.split(" ")[1];
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        next("Authentication Failed: ", error);
    }
};

module.exports = userAuth;