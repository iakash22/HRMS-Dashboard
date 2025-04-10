const jwt = require('jsonwebtoken');
const errors = require("../constant/errors");

exports.verifyToken = async (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers["authorization"]?.replace("Bearer ", "");
        // console.log("token :", token);

        jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
            if (err) return res.status(403).json({ message: 'Token expired or invalid' });
            req.user = user;
            next();
        });
    } catch (error) {
        console.error("Verify token middleware Error: ", error);
        return res.status(500).json(errors.SERVER_ERROR);
    }
}