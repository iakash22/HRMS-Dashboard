const jwt = require('jsonwebtoken');
const errors = require("../constant/errors");

exports.verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: 'Authorization header missing or invalid' });
        }

        const token = authHeader.split(" ")[1]; 
        const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(errors.TOKEN_EXPIRED.status).json(errors.TOKEN_EXPIRED);
                } else if (err.name === 'JsonWebTokenError') {
                    return res.status(errors.INVALID_TOKEN.status).json(errors.INVALID_TOKEN);
                }
                return res.status(errors.AUTHENTICATION_FAILED.status).json(errors.AUTHENTICATION_FAILED);
            }

            req.user = decoded; // user info from token
            next();
        });
    } catch (error) {
        console.error("Verify token middleware Error:", error);
        return res.status(500).json(errors.SERVER_ERROR);
    }
};
