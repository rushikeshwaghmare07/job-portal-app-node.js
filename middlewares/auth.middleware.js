const JWT = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            // next("Authentication Failed: No Bearer token provided");
            res.status(400).json({ success: false, message: "Authentication Failed: No Bearer token provided"})

        }
        const token = authHeader.split(" ")[1];
        const payload = JWT.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId };
        next();
    } catch (error) {
        next("Authentication Failed: ");
    }
};

module.exports = userAuth;