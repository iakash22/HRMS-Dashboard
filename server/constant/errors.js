const status = 400;

const SERVER_ERROR = {
    status: 500,
    message: "Server Error!",
    type: "SERVER_ERROR",
}

const USER_ALREADY_EXISTS = {
    status,
    message: "USER ALREADY EXISTS",
    type: "USER_EXISTS",
}

const USER_DOESNOT_EXISTS = {
    status,
    message: "User doesn't exists, Please register!",
    type: "USER_DOESNOT_EXISTS",
}

const WRONG_PASSWORD = {
    status: 401,
    message: "Wrong Password",
    type: "WRONG_PASSWORD"
}

const ACCOUNT_SOFT_DELETE = {
    status: 404,
    message: "Account Not Found or Temporary Deleted",
    type: "ACCOUNT_SOFT_DELETE"
}

const FIELDS_REQUIRED = {
    status,
    message: "All Fields Required",
    type: "FIELDS_REQUIRED",
}

const INVALID_USER_ID = {
    status,
    message: "Invalid User Id",
    type: "INVALID_VALUE",
}

const TOKEN_EXPIRED = {
    status: 401,
    message: 'Session expired. Please login again.',
    type: 'TOKEN_EXPIRED',
};

const INVALID_TOKEN = {
    status: 401,
    message: 'Invalid token. Please login again.',
    type: 'INVALID_TOKEN',
};
const AUTHENTICATION_FAILED = {
    status: 403,
    message: 'Authentication failed.',
    type: 'AUTHENTICATION_FAILED',
};

const NOT_FOUND = {
    status: 404,
    message: "Not Found",
    type: "NOT_FOUND"
}

module.exports = {
    SERVER_ERROR: SERVER_ERROR,
    USER_ALREADY_EXISTS: USER_ALREADY_EXISTS,
    USER_DOESNOT_EXISTS: USER_DOESNOT_EXISTS,
    WRONG_PASSWORD: WRONG_PASSWORD,
    ACCOUNT_SOFT_DELETE: ACCOUNT_SOFT_DELETE,
    FIELDS_REQUIRED: FIELDS_REQUIRED,
    INVALID_USER_ID: INVALID_USER_ID,
    NOT_FOUND: NOT_FOUND,
    TOKEN_EXPIRED,
    INVALID_TOKEN,
    AUTHENTICATION_FAILED,
};