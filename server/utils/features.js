const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isValidObjectId } = require('mongoose');

const encryptPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
}

const VerifyPassword = async (password, hashPassword) => {
    if (await bcrypt.compare(password, hashPassword)) return true;
    return false;
}

const tokenGenerateToken = (payload, secretKey) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });
    return token;
}

const getBase64 = (file) => {
    return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
}

const checkValidId = (message = "Invalid Id") => {
    return (value, helpers) => {
        if (!isValidObjectId(value)) {
            return helpers.message(message);
        }
        return value;
    };
};

module.exports = {
    encryptPassword: encryptPassword,
    VerifyPassword: VerifyPassword,
    tokenGenerateToken: tokenGenerateToken,
    getBase64: getBase64,
    checkValidId: checkValidId,
}