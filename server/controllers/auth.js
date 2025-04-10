const errors = require('../constant/errors');
const models = require('../models');
const features = require('../utils/features');

const register = async (payload) => {
    try {
        const { fullName, password, email } = payload;

        const checkWithEmail = await models.User.findOne({ email });

        if (checkWithEmail) {
            return errors.USER_ALREADY_EXISTS;
        }

        const hashPassword = await features.encryptPassword(password);
        const profileUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`;
        const user = await models.User.create({
            fullName,
            email,
            profileUrl,
            password: hashPassword,
            isDeleted: false,
            isBlocked: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        user.password = undefined;

        return { status: 200, message: `Register Successfully!` };
    } catch (error) {
        console.error("Error Ocurred Occurred while register user controller", error);
        return errors.SERVER_ERROR;
    }
};


const login = async (payload) => {
    try {
        const { email, password } = payload;
        const user = await models.User.findOne({ email })

        if (!user) {
            return errors.USER_DOESNOT_EXISTS;
        }

        if (user.isDeleted) {
            return errors.ACCOUNT_SOFT_DELETE;
        }
        // console.log(user);

        if (await features.VerifyPassword(password, user.password)) {
            const JWT_SECRET = process.env.JWT_SECRET;
            const token = features.tokenGenerateToken({ id: user._id, email }, JWT_SECRET);

            const tokenGenerateAt = Date.now();
            const TWO_HOURS = 2 * 60 * 60 * 1000;
            const tokenExpireAt = tokenGenerateAt + TWO_HOURS;

            // const updateUser = await models.User.findByIdAndUpdate(user._id, { token, tokenGenerateAt, tokenExipreAt }, { new: true }).select("-password").exec();
            user.password = undefined;
            user.isDeleted = undefined;
            return { status: 200, message: `Welcome Back, ${user.fullName}`, data: { user, token, tokenExpireAt } };
        } else {
            return errors.WRONG_PASSWORD;
        }

    } catch (error) {
        console.error("Error Ocurred Occurred while login controller", error);
        return errors.SERVER_ERROR;
    }
}

const logout = async (payload) => {
    try {
        const userId = payload.userId;
        const user = await models.User.findOne({ _id: userId });

        if (!user) {
            return errors.INVALID_USER_ID;
        }

        user.token = null;
        user.tokenGenerateAt = null;
        user.tokenExipreAt = null;
        await user.save();
        return { status: 200, message: "You’ve logged out" };
    } catch (error) {
        console.error("Error Ocurred Occurred while logout controller", error);
        return errors.SERVER_ERROR;
    }
}

module.exports = {
    register: register,
    login: login,
    logout: logout,
}